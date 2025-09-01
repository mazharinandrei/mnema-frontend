import { useState, useEffect, useRef } from "react"
import api from "../api"
import Entry from "../components/Entry"
import { Heading, Button, Textarea, Group, Box, Container, Center, IconButton, Spinner } from "@chakra-ui/react"
import { ArrowUp } from "../components/Icons"
import Header from "../components/Header"
import DateIsland from "../components/DateIsland"


function Diary() {

    const [entries, setEntries] = useState([]);
    const [content, setContent] = useState("");
    const [entriesMax, setEntriesMax] = useState(0);
    const [nextPage, setNextPage] = useState(`api/diary?page=${1}`);

    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // const limit = 10;

    const entriesContainerRef = useRef(null); // ссылка на контейнер записей

    const entryRefs = useRef([]); // ссылка на массив рефов для каждой записи

    const prevTopIdx = useRef(null);

    const [topEntryDate, setTopEntryDate] = useState("сегодня"); // переменная для хранения даты верхней записи
    //TODO: не сегодня, а дата последней записи

    const [hints, setHints] = useState({ title: "дневник", placeholder: "текст записи..." });

    useEffect(() => { // при загрузке компонента 
        getEntries();
        getHints();
    }, [])

    useEffect(() => {
        if (entriesContainerRef.current) {
            // прокручиваем скролл вниз
            entriesContainerRef.current.scrollTop = entriesContainerRef.current.scrollHeight;
        }
    }, [entries] /*[entries] - значит, что происходит при любом обновлении entries*/);

    const getHints = () => {
        api
            .get("api/entry-hints")
            .then((res) => setHints(res.data))
            .catch((err) => console.error(err))
    }

    // получаем записи из API
    const getEntries = () => {

        api
            .get(nextPage)
            .then((res) => res.data)
            .then((data) => {
                let reversed = data.results.reverse();

                if (data.next) {
                    setHasMore(true);
                    setNextPage(data.next);
                } else setHasMore(false);
                setEntries(prevItems => [...reversed, ...entries]);
                console.log(data);
                setEntriesMax(data.count)
            })
            .catch((err) => console.log(err));
    };

    const deleteEntry = (id) => {
        api
            .delete(`/api/diary/delete/${id}`)
            .then((res) => {
                if (res.status === 204) console.log("запись удалена☠");
                else alert("что-то пошло не так😾");
                getEntries(); // TODO: не getEntries, а удалить конкретный элемент
            });
    };

    const createEntry = (e) => {
        e.preventDefault()
        api.post("/api/diary", { content }).then((res) => {
            if (res.status === 201) { console.log("щщя пажжи появится запись"); setContent("") }
            else alert("что-то пошло не так😾")
            getEntries(); // TODO: не getEntries, а добавить entry в array
        }).catch((err) => alert(err))

    }

    const formatForDisplay = (date) => {
        const today = new Date();
        const entryDate = new Date(date);
        const diff = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24)); // разница в днях

        if (diff === 0) { console.log("Дата записи: " + entryDate + "; разница в днях: " + diff); return "сегодня"; }

        else if (diff === 1) { console.log("Дата записи: " + entryDate + "; разница в днях: " + diff); return "вчера"; }

        else if (today.getFullYear() === entryDate.getFullYear()) {
            console.log("Дата записи: " + entryDate + "; разница в днях: " + diff);
            return entryDate.toLocaleDateString("ru-RU", { month: 'long', day: 'numeric' });
        }

        console.log("Дата записи: " + entryDate + "; разница в днях: " + diff);
        return entryDate.toLocaleDateString("ru-RU", {

            year: 'numeric', month: 'long', day: 'numeric'
        });
    }

    const handleScroll = async () => {
        if (entriesContainerRef.current) {

            if (entriesContainerRef.current.scrollTop < 1) {
                setIsLoading(true);
                if (hasMore)
                    getEntries();
            }
            else
                setIsLoading(false);

            console.log(entriesContainerRef.current.scrollTop,
                entriesContainerRef.current.clientHeight,
                entriesContainerRef.current.scrollHeight)
            updateDate();
        }
    }

    const updateDate = async () => {
        if (!entriesContainerRef.current) return;
        const containerTop = entriesContainerRef.current.getBoundingClientRect().top;
        let minDiff = Infinity;
        let topIdx = 0;
        entryRefs.current.forEach((el, idx) => {
            if (el) {
                const diff = Math.abs(el.getBoundingClientRect().top - containerTop);
                if (diff < minDiff) {
                    minDiff = diff;
                    topIdx = idx;
                }
            }
        });
        if (entries[topIdx] && prevTopIdx.current !== topIdx) {
            prevTopIdx.current = topIdx;
            //console.log("Текущая запись сверху:", entries[topIdx].created_at);
            setTopEntryDate(
                formatForDisplay(entries[topIdx].created_at)
            );

        }
    };

    return <Container
        maxW="container.md"
        height="100vh"
        display="flex"
        flexDirection="column"
        px={20}
        position="relative"
    >
        <Header title={hints.title} />

        {/* Прокручиваемая область записей */}
        <Center>
            <Box
                border="1px solid gray"
                borderRadius="xl"
                px={2}
            >{topEntryDate}</Box>
        </Center>
        < Box
            ref={entriesContainerRef}
            onScroll={handleScroll}
            flex="1"
            overflowY="auto"
            width="full"
            mb={4}
            css={{
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#f0e2e2ff',
                    borderRadius: '24px',
                },
            }}
        >
            {isLoading && hasMore && <Center><Spinner /></Center>}

            {
                entries.map((entry, idx) => (
                    //TODO: если меняется дата
                    <div ref={el => entryRefs.current[idx] = el} key={entry.id}>
                        <Entry entry={entry} onDelete={deleteEntry} />
                    </div>
                ))
            }
        </Box >

        {/* Форма ввода - прибита к низу */}
        < Box
            width="full"
            position="sticky"
            bottom={0}
            pt={2}
            pb={4}
        >
            <form onSubmit={createEntry}>
                <Box
                    position="relative"
                    border="1px solid"
                    borderRadius={20}
                    padding={2}>
                    <Textarea
                        type="text"
                        id="entry"
                        name="entry"
                        placeholder={hints.placeholder}
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        resize="none"
                        pr="50px"
                        autoresize
                        border="none"
                        outline="none"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                createEntry(e);
                            }
                        }}
                    />
                    <IconButton
                        position="absolute"
                        right="10px"
                        bottom="10px"
                        size="sm"
                        type="submit"
                        title="добавить запись"
                        rounded="full"
                    >
                        <ArrowUp />
                    </IconButton>
                </Box>
            </form>
        </Box >
    </Container >
}

export default Diary