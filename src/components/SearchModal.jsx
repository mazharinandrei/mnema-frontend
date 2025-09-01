import { AbsoluteCenter, Box, Center, CloseButton, Dialog, Heading, Image, Input, InputGroup, Portal, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { LuSearch } from "react-icons/lu"
import { Search } from "./Icons";
import api from "../api";
import Entry from "./Entry";

function SearchModal() {
    const [searchShow, setSearchShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);


    useEffect(() => {
        const timer = setTimeout(() => { // debounce 300ms
            if (searchQuery.trim() !== "") {
                searchEntries(searchQuery);
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const searchEntries = (query) => {
        api.get(`api/diary/search/?query=${query}`)
            .then((res) => res.data)
            .then((data) => {
                setSearchResults(data.results);
                console.log(data);
            })
            .catch((err) => console.log(err));
    }

    return (
        <Dialog.Root size="cover" placement="center" motionPreset="slide-in-bottom">
            <Dialog.Trigger asChild>
                <Box mx={6} onClick={() => setSearchShow(true)}><Search /></Box>
            </Dialog.Trigger>
            {searchShow && <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>поиск записей</Dialog.Title>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" onClick={() => setSearchShow(false)} />
                            </Dialog.CloseTrigger>
                        </Dialog.Header>
                        <Dialog.Body>
                            <InputGroup flex="1" startElement={<LuSearch />}>
                                <Input
                                    placeholder="введи поисковый запрос..."
                                    value={searchQuery}
                                    onChange={(ev) => setSearchQuery(ev.target.value)}
                                />
                            </InputGroup>

                            {searchResults.length > 0 ? (
                                searchResults.map((entry) => (
                                    <div key={entry.id}>
                                        <Entry entry={entry} />
                                    </div>
                                ))
                            ) : (

                                searchQuery.length > 0 ? (
                                    <AbsoluteCenter>
                                        <div>
                                            <Center><Image src='..\src\img\EntryNotFound.png' maxW="30vh" /></Center>
                                            <Center><Heading> по запросу «{searchQuery}» ничего не найдено</Heading></Center>
                                        </div>
                                    </AbsoluteCenter>) : (<AbsoluteCenter><Heading>...</Heading></AbsoluteCenter>)


                            )}
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>}
        </Dialog.Root>
    )
}

export default SearchModal