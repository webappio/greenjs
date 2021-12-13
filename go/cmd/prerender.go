package cmd

import (
	"context"
	"github.com/chromedp/chromedp"
	"github.com/pkg/errors"
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
	err := p.RenderToFile(p.browserCtx, "/", "dist/index")
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
				renderErr := p.RenderToFile(p.browserCtx, pagePath.(string), "dist/"+strings.Trim(pagePath.(string), "/"))
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

func (p *Prerenderer) RenderToFile(ctx context.Context, pagePath, fileBaseName string) error {
	log.Print("Rendering html for ", fileBaseName)
	err := os.MkdirAll(filepath.Dir(fileBaseName), 0o755)
	if err != nil {
		return errors.Wrapf(err, "could not make directories for %v", fileBaseName)
	}

	pages, err := p.Render(ctx, pagePath, fileBaseName)
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

func (p *Prerenderer) Render(ctx context.Context, pagePath, fileBaseName string) ([]string, error) {
	ctx, cancel := chromedp.NewContext(ctx)
	defer cancel()

	htmlDestFile, err := os.OpenFile(fileBaseName+".html", os.O_CREATE|os.O_TRUNC|os.O_WRONLY, 0o644)
	if err != nil {
		return nil, errors.Wrapf(err, "could not make file at %v.html", fileBaseName)
	}
	defer htmlDestFile.Close()
	cssDestFile, err := os.OpenFile(fileBaseName+".css", os.O_CREATE|os.O_TRUNC|os.O_WRONLY, 0o644)
	if err != nil {
		return nil, errors.Wrapf(err, "could not make file at %v.css", fileBaseName)
	}
	defer cssDestFile.Close()

	var bodyContents string
	var routes []string
	var cssRules string
	var extraHead string

	err = chromedp.Run(
		ctx,
		chromedp.Navigate(p.URI+pagePath),
		chromedp.OuterHTML("body", &bodyContents, chromedp.ByQuery),
		chromedp.Evaluate("Object.keys(window._GreenJSRoutes || {})", &routes),
		chromedp.Evaluate("[...document.styleSheets].flatMap(x => [...x.cssRules]).map(x => x.cssText).join(' ');", &cssRules),
		chromedp.Evaluate(`[...document.head.querySelectorAll(":not(script):not(style)")].map(x => x.outerHTML).join("\n")`, &extraHead),
	)
	if err != nil {
		return nil, errors.Wrapf(err, "could not generate page at %v", pagePath)
	}

	htmlDestFile.Write([]byte("<!DOCTYPE html>\n<html>\n<head>\n"))
	if len(cssRules) > 0 {
		cssDestFile.Write([]byte(cssRules))
		htmlDestFile.Write([]byte(`<link rel="stylesheet" href="/`+strings.TrimPrefix(fileBaseName, "dist/")+`.css" class="from-greenjs">`+"\n"))
	}
	htmlDestFile.Write([]byte(extraHead))
	htmlDestFile.Write([]byte("\n</head>\n"))
	htmlDestFile.Write([]byte(bodyContents))
	return routes, nil
}
