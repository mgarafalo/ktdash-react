'use client'
import { ActionIcon, Card, Container, Image, Popover, SimpleGrid, Stack, Tabs, Text, Title } from "@mantine/core";
import classes from './faction.module.css';
import { useSettings } from "../../hooks/use-settings";
import Link from "next/link";
import { IconFlask } from "@tabler/icons-react";
import { fetchFaction } from "@/hooks/use-api/fetchers";
import useSWR from "swr";
import { useParams } from "next/navigation";

export default function Faction() {
    const params = useParams();
    const { data: faction } = useSWR(`/faction.php?fa=${params.faction}`, fetchFaction);
    const [settings] = useSettings();
    const cards2021 = faction.killteams?.filter((killteam) => killteam.edition === "kt21")?.map((killteam) => (
        <Card key={killteam.killteamid} className={classes.card} p="md" radius="sm" component={Link} href={`/fa/${faction.factionid}/kt/${killteam.killteamid}`}>
            <Stack>
                <Image alt="Killteam Image" fit="cover" style={{ objectPosition: "top" }} radius="sm" src={`${!killteam.isCustom ? 'https://ktdash.app' : ''}/img/portraits/${faction.factionid}/${killteam.killteamid}/${killteam.killteamid}.jpg`} />
                <Title order={3}>{!!killteam.isCustom && <Popover width={200} position="bottom" withArrow shadow="md">
                        <Popover.Target>
                            <ActionIcon mr={5} variant="outline"><IconFlask /></ActionIcon>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Text>This is experimental content. Use with caution.</Text>
                        </Popover.Dropdown>
                    </Popover>}{killteam.killteamname} <sup>{killteam.edition}</sup></Title>
                <span dangerouslySetInnerHTML={{ __html: `${killteam.description.split('<br/>')[0]}` }} />
            </Stack>
        </Card>
    ));
    const cards2024 = faction.killteams?.filter((killteam) => killteam.edition === "kt24")?.map((killteam) => (
        <Card key={killteam.killteamid} className={classes.card} p="md" radius="sm" component={Link} href={`/fa/${faction.factionid}/kt/${killteam.killteamid}`}>
            <Stack>
                <Image alt="Killteam Image" fit="cover" style={{ objectPosition: "top" }} radius="sm" src={`${!killteam.isCustom ? 'https://ktdash.app' : ''}/img/portraits/${faction.factionid}/${killteam.killteamid}/${killteam.killteamid}.jpg`} />
                <Title order={3}  onClick={(e) => { e.preventDefault(); e.stopPropigation() }}>
                    {!!killteam.isCustom && <Popover width={200} withArrow shadow="md">
                        <Popover.Target>
                            <ActionIcon mr={5} variant="outline"><IconFlask /></ActionIcon>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Text>This is experimental content and should not be used in competitive events.</Text>
                        </Popover.Dropdown>
                    </Popover>}
                    {killteam.killteamname} <sup>{killteam.edition}</sup>
                </Title>
                <span dangerouslySetInnerHTML={{ __html: `${killteam.description.split('<br/>')[0]}` }} />
            </Stack>
        </Card>
    ));
    return (
        <Container px="md" pb="md" fluid>
            <Stack>
                <SimpleGrid my="md" cols={{ base: 1, sm: 2 }} spacing="md">
                    <Image alt="Faction Image" fit="cover" style={{ objectPosition: "top" }} h={300} radius="sm" src={`https://ktdash.app/img/portraits/${faction?.factionid}/${faction?.factionid}.jpg`} />
                    <Stack justify="flex-start" align="flex-start" grow={1}>
                        <Title>
                            {faction?.factionname}
                        </Title>
                        <Text>
                            <span dangerouslySetInnerHTML={{ __html: `${faction.description}` }} />
                        </Text>
                    </Stack>
                </SimpleGrid>
                <Tabs defaultValue={settings.edition || "kt24"}>
                    <Stack>
                        <Tabs.List grow>
                            {(!settings.edition || settings.edition === "kt21") && <Tabs.Tab value="kt21">
                                KT2021
                            </Tabs.Tab>}
                            {(!settings.edition || settings.edition === "kt24") && <Tabs.Tab value="kt24">
                                KT2024
                            </Tabs.Tab>}
                        </Tabs.List>
                        <Tabs.Panel value="kt21">
                            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
                                {cards2021}
                            </SimpleGrid>
                        </Tabs.Panel>
                        <Tabs.Panel value="kt24">
                            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
                                {cards2024}
                            </SimpleGrid>
                        </Tabs.Panel>
                    </Stack>
                </Tabs>
            </Stack>
        </Container>
    );
}
