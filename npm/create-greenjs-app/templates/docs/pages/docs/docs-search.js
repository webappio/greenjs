import { ALL_CONTENT } from "./index";

const getSearchResults = (searchQuery = "") => {
    if (searchQuery.length === 0) return {};

    const query = searchQuery.toUpperCase().trim();

    const searchResults = [];

    // Search by Section Title
    for (let i = 0; i < ALL_CONTENT.length; i++) {
        const page = ALL_CONTENT[i];
        const main = page.MAIN;
        if (main?.name?.toUpperCase().includes(query)) {
            const searchContent = {
                Link: main.link,
                Name: main.name,
                Content: main.content,
                IsTitle: true,
            }
            searchResults.push(searchContent);
        }
    }


    // Search by Page Content Title

    // Search by Page Content
    for (let i = 0; i<ALL_CONTENT.length; i++) {
        const page = ALL_CONTENT[i];
        const content = page.CONTENT;
        for (let j = 0; j < content.length; j++) {
            const subContent = content[j];
            if (subContent?.content?.toUpperCase().includes(query)) {
                const searchContent = {
                    Link: subContent.link,
                    Name: subContent.name,
                    Content: subContent.content,
                    IsTitle: false,
                };
                searchResults.push(searchContent);
            } else if (subContent?.name?.toUpperCase().includes(query)) {
                const searchContent = {
                    Link: subContent.link,
                    Name: subContent.name,
                    Content: subContent.content,
                    IsTitle: true,
                };
                searchResults.push(searchContent);
            }
        }
    }

    return searchResults;
}

export default getSearchResults;