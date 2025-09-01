import React, { useRef, useState } from "react";
import { Box, Text, CloseButton, Flex } from "@chakra-ui/react"

function Entry({ entry, onDelete }) {

    const formattedDate = new Date(entry.created_at).toLocaleDateString("ru-RU")
    const time = new Date(entry.created_at).toLocaleTimeString("ru-RU", {
        hour: '2-digit',
        minute: '2-digit'
    })
    return <Box my="5">
        <Flex
            justify="space-between"
            align="stretch"
        >
            <Box>
                <Text textAlign="left"> {entry.content} </Text>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="space-between">
                <Box>
                    <CloseButton
                        onClick={() => onDelete(entry.id)}
                        size="sm"
                        alignSelf="flex-start"
                        title="Удалить запись"
                    />
                </Box>
                <Box>
                    <Text
                        //opacity={0}
                        fontWeight="medium"
                        textStyle="xs"
                        alignSelf="flex-end"
                        title={`${formattedDate} ${time}`}
                    >{time}</Text>
                </Box>
            </Box>
        </Flex>
    </Box>
}

export default Entry