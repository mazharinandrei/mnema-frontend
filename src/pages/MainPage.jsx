import { AbsoluteCenter, Heading, Link } from "@chakra-ui/react";

function MainPage() {
    return <AbsoluteCenter>
        <Link href="/diary"><Heading textStyle="3xl">перейти в дневник »</Heading></Link>
    </AbsoluteCenter>
}

export default MainPage