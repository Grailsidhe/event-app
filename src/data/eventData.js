import * as fr from './data.json'
import * as en from './en.json'
import { useStore } from "../store";

const store = useStore()
const data = store.state.language === "fr" ? fr : en;

const event = data.default.data.events.map(item => {
    const sceneName = data.default.data.scenes.filter(scene => item.sceneId === scene._id)
    const genreNames = data.default.data.genres.filter(genre => item.genres?.includes(genre._id))
    const imagesLinkName = data.default.data.applicationConfig.fbNotifTopic
    return ({ 
        ...item,
        day: new Date(item.showStartDate).toLocaleDateString('fr-fr', { weekday:"long", month:"long", day:"numeric"}),
        image: `https://${imagesLinkName}.chapi.to/api/files/${item.image?.slice(1, item.image.length - 4)}`,
        startDate: new Date(item.showStartDate).toLocaleDateString('fr-fr', { weekday:"long", month:"long", day:"numeric", year:"numeric"}),
        endDate: new Date(item.showEndDate).toLocaleDateString('fr-fr', { weekday:"long", month:"long", day:"numeric", year:"numeric"}),
        genres: genreNames.map(tag => tag.name).sort(),
        tags: genreNames.map(tag => tag.name).sort(),
        hour: `${new Date(item.showStartDate).getHours()}:${new Date(item.showStartDate).getMinutes().toString().replace(/^(\d)$/, '0$1')} - ${new Date(item.showEndDate).getHours()}:${new Date(item.showEndDate).getMinutes().toString().replace(/^(\d)$/, '0$1')}`,
        guests: data.default.data.groups.filter(guest => item.musicGroupsIds?.includes(guest._id)),
        place: sceneName[0].name,
        link: item.eventTicketLink,
        route: 'event',
        name: item.title
   })
})

export default event