package main

import (
	"encoding/json"
	"github.com/pkg/errors"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
)

func unmarshal(fileName string, dest interface{}) {
	fileContents, err := ioutil.ReadFile(fileName)
	if err != nil {
		panic(err)
	}
	err = json.Unmarshal(fileContents, dest)
	if err != nil {
		panic(err)
	}
}

func publishPackageJson(fileName string, data interface{}) {
	f, err := os.OpenFile(fileName, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0o644)
	if err != nil {
		panic(err)
	}
	encoder := json.NewEncoder(f)
	encoder.SetIndent("", "  ")
	err = encoder.Encode(data)
	if err != nil {
		panic(err)
	}

	cmd := exec.Command("npm", "publish", "--access", "public")
	cmd.Dir = filepath.Dir(fileName)
	out, err := cmd.CombinedOutput()
	if err != nil {
		panic(errors.Wrap(err, string(out)))
	}
}

type ArchTarget struct {
	GOOS, GOARCH string
	BinaryName string
	CPU string //for package.json
	OS string //for package.json
}

type PackageJson struct {
	Name string `json:"name,omitempty"`
	Version string `json:"version,omitempty"`
	Description string `json:"description,omitempty"`
	Author string `json:"author,omitempty"`
	License string `json:"license,omitempty"`
	Bin map[string]string `json:"bin,omitempty"`
	PeerDependencies map[string]string `json:"peerDependencies,omitempty"`
	OS []string `json:"os,omitempty"`
	CPU []string `json:"cpu,omitempty"`
}

func main() {
	arches := []ArchTarget{
		{
			GOOS: "linux",
			GOARCH: "amd64",
			CPU: "x64",
		},
		{
			GOOS: "linux",
			GOARCH: "386",
			CPU: "ia32",
		},
		{
			GOOS: "darwin",
			GOARCH: "amd64",
			CPU: "x64",
		},
		{
			GOOS: "darwin",
			GOARCH: "arm64",
			CPU: "arm64",
		},
		{
			GOOS: "windows",
			GOARCH: "amd64",
			CPU: "x64",
			OS: "win32",
			BinaryName: "greenjs.exe",
		},
	}

	os.RemoveAll("dist")

	var metaPackageJson PackageJson
	unmarshal("package.json", &metaPackageJson)
	metaPackageJson.PeerDependencies = map[string]string{}

	for _, arch := range arches {
		if arch.BinaryName == "" {
			arch.BinaryName = "greenjs"
		}
		if arch.OS == "" {
			arch.OS = arch.GOOS
		}

		err := os.MkdirAll(filepath.Join("dist", arch.GOOS+"-"+arch.CPU, "bin"), 0o700)
		if err != nil {
			panic(err)
		}

		var archPackageJson PackageJson
		unmarshal("arch-package.json", &archPackageJson)

		archPackageJson.Version = metaPackageJson.Version
		archPackageJson.Name = "@greenio/greenjs-"+arch.GOOS+"-"+arch.CPU
		archPackageJson.Bin = map[string]string{"greenjs": filepath.Join("bin", arch.BinaryName)}
		archPackageJson.OS = []string{arch.OS}
		archPackageJson.CPU = []string{arch.CPU}
		metaPackageJson.PeerDependencies[archPackageJson.Name] = archPackageJson.Version
		cmd := exec.Command("go", "build", "-o", filepath.Join("dist", arch.GOOS+"-"+arch.CPU, "bin", arch.BinaryName))
		cmd.Env = append(os.Environ(), "GOOS="+arch.GOOS, "GOARCH="+arch.GOARCH)
		out, err := cmd.CombinedOutput()
		if err != nil {
			panic(errors.Wrap(err, string(out)))
		}
		publishPackageJson(filepath.Join("dist", arch.GOOS+"-"+arch.CPU, "package.json"), archPackageJson)

	}

	err := os.MkdirAll(filepath.Join("dist", "base"), 0o700)
	if err != nil {
		panic(err)
	}
	publishPackageJson(filepath.Join("dist", "base", "package.json"), metaPackageJson)
}