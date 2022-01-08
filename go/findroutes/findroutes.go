package findroutes

import (
	"github.com/evanw/esbuild/pkg/api"
	"regexp"
)

//TODO HACK: grepping output files for routes is not great
var HashedChunkPattern = regexp.MustCompile(`createElement\(Route,{.*?path:"(.*?)".*?}[,)]`)

func FindRoutesFromOutputFiles(files []api.OutputFile) []string {
	var res []string
	for _, file := range files {
		matches := HashedChunkPattern.FindAllStringSubmatch(string(file.Contents), -1)
		for _, match := range matches {
			res = append(res, match[1])
		}
	}
	return res
}