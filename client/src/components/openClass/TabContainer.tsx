import tw from "tailwind-styled-components"

const Container = tw.div`
    flex
`

const Title = tw.div`
    font-bold
`;

const TabContainer = () => {
    return (
        <>
            <Container>
                <Title>땡땡땡님의 강좌개설</Title>
            </Container>
        </>
    )
}

export default TabContainer