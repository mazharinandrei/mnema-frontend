import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

import {
    AbsoluteCenter,
    Button,
    Center,
    Field,
    Fieldset,
    For,
    Heading,
    Image,
    Input,
    NativeSelect,
    Textarea,
} from "@chakra-ui/react"

function UserForm({ route, method }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoadind] = useState(false)
    const navigate = useNavigate()

    const [entersUsername, setEntersUsername] = useState(false);
    const [entersPassword, setEntersPassword] = useState(false);
    const [imgSrc, setImgSrc] = useState("..\\src\\img\\login1.png")

    const name = method === "login" ? "Вход" : "Регистрация"

    useEffect(() => {
        entersPassword ? setImgSrc("..\\src\\img\\login3.png") : (
            entersUsername ? setImgSrc("..\\src\\img\\login2.png") : ""
        )
    }, [entersUsername, entersPassword])



    const handleSubmit = async (e) => {
        setLoadind(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        }
        catch (error) {
            alert(error)
        } finally {
            setLoadind(false)
        }
    }
    return <form onSubmit={handleSubmit} className="form-container">
        <AbsoluteCenter>
            <Fieldset.Root>
                <Center><Heading size="3xl">{name}</Heading></Center>
                <Center><Image src={imgSrc} maxW="30%"></Image></Center>
                <Fieldset.Content>
                    <Field.Root>
                        <Input
                            className="form-input"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value); setEntersUsername(true) }}
                            placeholder="Имя пользователя"
                            autocomplete="on"
                        />
                    </Field.Root>

                    <Field.Root>
                        <Input
                            className="form-input"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setEntersPassword(true) }}
                            placeholder="Пароль"
                            autocomplete="on"
                        />
                    </Field.Root>
                </Fieldset.Content>

                <Button className="form-button" type="submit">
                    {name}
                </Button>
            </Fieldset.Root>
        </AbsoluteCenter>
    </form >
}

export default UserForm