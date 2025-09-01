import { AbsoluteCenter, Link, Container, Heading, Image, Center } from "@chakra-ui/react"

function NotFound() {
    return <div>
        <Image src='..\src\img\NotFound.png' maxW="100vh" position="absolute" right="0" bottom="0" />
        <Center>
            <Link fontFamily="Playfair Display" fontWeight="bold" textStyle="2xl" href={document.referrer} p={30}>«  назад</Link>
            <Link fontFamily="Playfair Display" fontWeight="bold" textStyle="2xl" href="/diary/" p={30}>на главную »</Link>
        </Center>
        <AbsoluteCenter ><Heading textStyle="5xl" fontWeight="light">Ты попал на страницу, которой не существует</Heading></AbsoluteCenter>
    </div >
}

export default NotFound