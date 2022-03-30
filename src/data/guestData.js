import * as fr from './data.json'
import * as en from './en.json'
import { useStore } from "../store";

const store = useStore()
const data = store.state.language === "fr" ? fr : en;
import eventData from './eventData.js'

const guestEvents = (guestId) => {
    const res = eventData.filter(event => event.musicGroupsIds?.includes(guestId)).map(event => {
        const sceneName = data.default.data.scenes.filter(scene => event.sceneId === scene._id)
        const genreNames = data.default.data.genres.filter(genre => event.genres?.includes(genre._id))
        return { 
          ...event,
          day: new Date(event.showStartDate).toLocaleDateString('fr-fr', { weekday:"long", month:"long", day:"numeric"}),
          image: event.image.slice(1, event.image.length - 4),
          startDate: new Date(event.showStartDate).toLocaleDateString('fr-fr', { weekday:"long", month:"long", day:"numeric", year:"numeric"}),
          endDate: new Date(event.showEndDate).toLocaleDateString('fr-fr', { weekday:"long", month:"long", day:"numeric", year:"numeric"}),
          genres: genreNames.map(tag => tag.name),
          hour: `${new Date(event.showStartDate).getHours()}:${new Date(event.showStartDate).getMinutes().toString().replace(/^(\d)$/, '0$1')} - ${new Date(event.showEndDate).getHours()}:${new Date(event.showEndDate).getMinutes().toString().replace(/^(\d)$/, '0$1')}`,
          program: event.programId,
          scene: sceneName,
          place: sceneName[0].name,
          link: event.eventTicketLink
        }
    })
    return res
}

const guest = data.default.data.groups.map(item => {
    const tagNames = data.default.data.genres.filter(genre => item.genres?.includes(genre._id))
    const imagesLinkName = data.default.data.applicationConfig.fbNotifTopic
    return ({ 
        ...item,
        image: `https://${imagesLinkName}.chapi.to/api/files/${item.image?.slice(1, item.image.length - 4)}`,
        events: guestEvents(item._id),
        place: guestEvents(item._id)[0],
        tags: tagNames.map(tag => tag.name).sort(),
        website: item.website || "",
        id: item._id,
        day: guestEvents(item._id)[0]?.day,
        hour: guestEvents(item._id)[0]?.hour,
        route: 'guest',
        title: item.name,
        showStartDate: [...new Set(guestEvents(item._id).map(event => event.showStartDate).flat())]
    })
})

export default guest
