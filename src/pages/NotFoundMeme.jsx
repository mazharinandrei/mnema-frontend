import { AbsoluteCenter, Link, Container, Heading, Image, Center } from "@chakra-ui/react"

function NotFound() {
    return <div>

        <AbsoluteCenter>
            <Image src="https://www.meme-arsenal.com/memes/3a6a23ed7432a96ac5a8ef7b3603d2cc.jpg" />
        </AbsoluteCenter>
        <AbsoluteCenter>
            <Heading as="h1" fontSize={600}>404</Heading>
        </AbsoluteCenter>
        <Link href="/diary/" p={30}>На главную</Link>
    </div >
}

export default NotFound