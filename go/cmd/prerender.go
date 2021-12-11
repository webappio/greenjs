package cmd

import (
	"context"
	"github.com/chromedp/chromedp"
	"github.com/pkg/errors"
	"io"
	"log"
	"os"
	"path/filepath"
	"strings"
	"sync"
)

type Prerenderer struct {
	URI string

	browserCtx context.Context
	cancel context.CancelFunc
	pagesToVisit sync.Map
	pagesVisited sync.Map
}

func (p *Prerenderer) Start() error {
	p.browserCtx, p.cancel = chromedp.NewContext(context.Background())
	err := chromedp.Run(p.browserCtx)
	if err != nil {
		return errors.Wrap(err, "could not create a browser")
	}
	return nil
}

func (p *Prerenderer) Cancel() {
	if p.cancel != nil {
		p.cancel()
	}
}

func (p *Prerenderer) RenderAll() error {
	p.pagesVisited.Store("/", true)
	err := p.RenderToFile(p.browserCtx, "/", "dist/index.html")
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
				renderErr := p.RenderToFile(p.browserCtx, pagePath.(string), "dist/"+strings.Trim(pagePath.(string), "/")+".html")
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

func (p *Prerenderer) GetPagesVisited() *sync.Map {
	return &p.pagesVisited
}

func (p *Prerenderer) RenderToFile(ctx context.Context, pagePath, fileName string) error {
	log.Print("Rendering html for ", fileName)
	err := os.MkdirAll(filepath.Dir(fileName), 0o755)
	if err != nil {
		return errors.Wrapf(err, "could not make directories for %v", fileName)
	}
	destFile, err := os.OpenFile(fileName, os.O_CREATE|os.O_TRUNC|os.O_WRONLY, 0o644)
	if err != nil {
		return errors.Wrapf(err, "could not make file at %v", fileName)
	}

	pages, err := p.Render(ctx, pagePath, destFile)
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

func (p *Prerenderer) Render(ctx context.Context, pagePath string, dest io.Writer) ([]string, error) {
	ctx, cancel := chromedp.NewContext(ctx)
	defer cancel()

	var pageContents string
	var routes []string

	err := chromedp.Run(
		ctx,
		chromedp.Navigate(p.URI+pagePath),
		chromedp.OuterHTML("html", &pageContents, chromedp.ByQuery),
		chromedp.Evaluate("Object.keys(window._GreenJSRoutes || {})", &routes),
	)
	if err != nil {
		return nil, errors.Wrapf(err, "could not generate page at %v", pagePath)
	}

	dest.Write([]byte("<!DOCTYPE html>\n"))
	dest.Write([]byte(pageContents))
	return routes, nil
}
