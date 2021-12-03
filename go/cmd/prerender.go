package cmd

import (
	"context"
	"github.com/chromedp/chromedp"
	"github.com/pkg/errors"
	"io"
	"os"
	"path/filepath"
	"sync"
	"time"
)

type Prerenderer struct {
	pagesToVisit sync.Map
	pagesVisited sync.Map
}

func (p *Prerenderer) RenderAll() error {
	p.pagesVisited.Store("/", true)
	err := p.RenderToFile("/", "dist/index.html")
	if err != nil {
		return err
	}
	wg := sync.WaitGroup{}
	anyVisited := true
	for anyVisited {
		anyVisited = false
		p.pagesToVisit.Range(func(pagePath, _ interface{}) bool {
			wg.Add(1)
			anyVisited = true
			go func() {
				renderErr := p.RenderToFile(pagePath.(string), "dist/"+pagePath.(string)+".html")
				if renderErr != nil {
					err = renderErr
				}
				wg.Done()
			}()
			p.pagesToVisit.Delete(pagePath)
			return true
		})
		wg.Wait()
		if err != nil {
			return err
		}
	}
	return nil
}

func (p *Prerenderer) RenderToFile(pagePath, fileName string) error {
	err := os.MkdirAll(filepath.Dir(fileName), 0o755)
	if err != nil {
		return errors.Wrapf(err, "could not make directories for %v", fileName)
	}
	destFile, err := os.OpenFile(fileName, os.O_CREATE|os.O_TRUNC|os.O_WRONLY, 0o644)
	if err != nil {
		return errors.Wrapf(err, "could not make file at %v", fileName)
	}

	pages, err := p.Render(pagePath, destFile)
	if err != nil {
		return errors.Wrapf(err, "could not render page at %v", pagePath)
	}
	for _, page := range pages {
		if _, seen := p.pagesVisited.LoadOrStore(page, true); !seen {
			p.pagesToVisit.Store(page, true)
		}
	}
	return nil
}

func (p *Prerenderer) Render(pagePath string, dest io.Writer) ([]string, error) {
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	var pageContents string
	var routes []string

	err := chromedp.Run(
		ctx,
		chromedp.Navigate("http://localhost:8000"+pagePath),
		chromedp.Sleep(time.Second),
		chromedp.OuterHTML("html", &pageContents, chromedp.ByQuery),
		chromedp.Evaluate("Object.keys(window._GreenJSRoutes)", &routes),
	)
	if err != nil {
		return nil, errors.Wrapf(err, "could not generate page at %v", pagePath)
	}

	dest.Write([]byte("<!DOCTYPE html>\n"))
	dest.Write([]byte(pageContents))
	return routes, nil
}
