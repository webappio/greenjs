package cmd

import (
	"context"
	"github.com/chromedp/chromedp"
	"io"
	"time"
)

type Prerenderer struct {
}

func (p *Prerenderer) Render(pageURI string, dest io.Writer) {
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	var pageContents string

	err := chromedp.Run(
		ctx,
		chromedp.Navigate(pageURI),
		chromedp.Sleep(time.Second),
		chromedp.OuterHTML("html", &pageContents, chromedp.ByQuery),
	)
	if err != nil {
		panic(err) //TODO
	}

	dest.Write([]byte("<!DOCTYPE html>\n"))
	dest.Write([]byte(pageContents))
}
