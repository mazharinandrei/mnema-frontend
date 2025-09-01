import { Avatar, Box, Button, Center, Dialog, Flex, Heading, Menu, Portal, Wrap } from "@chakra-ui/react"
import { MenuOutlined, Search } from "./Icons"
import { useState } from "react"
import SearchModal from "./SearchModal";

function Header({ title }) {


    return <div>
        <Flex
            as="header"
            align="center"
            justify="space-between"
            position="sticky"
            top="0"
        //bg="gray.100"
        >

            <Menu.Root>
                <Menu.Trigger asChild>
                    <Button variant="outline" size="sm">
                        <MenuOutlined />
                    </Button>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content>
                            <Menu.Item value="dashboard" asChild><a href="/dashboard">Календарь</a></Menu.Item>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>

            < Heading as="h1" textStyle="3xl" fontWeight="light" mb={4} textAlign="center" >
                {title}
            </Heading >
            <Wrap align="center">
                <SearchModal />
                <Menu.Root>
                    <Avatar.Root>
                        <Menu.Trigger asChild>
                            <div>
                                <Avatar.Fallback name="user" />
                                <Avatar.Image src="https://img.randme.me/" />
                            </div>
                        </Menu.Trigger>
                    </Avatar.Root>
                    <Portal>
                        <Menu.Positioner>
                            <Menu.Content>
                                <Menu.Item value="logout" asChild><a href="/logout">Выйти</a></Menu.Item>
                                <Menu.Item value="settings" asChild><a href="">Настройки</a></Menu.Item>
                            </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                </Menu.Root>
            </Wrap>
        </Flex>

    </div >
}
export default Header