import {useEffect, useState} from 'react'
import Tabs from '../Tabs'
import Link from 'next/link'

const Gallery = ({ tabs, images }) => {
    const [activeTab, setActiveTab] = useState('all')
    const [fade, setFade] = useState(false)
    const [links, setLinks] = useState(null)

    useEffect(() => {
        setFade(false)
        const timeout = setTimeout(() => setFade(true), 50)
        // filtre les tabs pour retourner les images actuelles
        const works = images.filter(tab => (tab.tab === activeTab)).flatMap(tab => tab.works)
        setLinks(works.map(w => 'works/' + w.slug))
        return () => clearTimeout(timeout)
    }, [activeTab, images])

    const handleClick = e => {
        e.preventDefault()
        console.log('hello')
    }

    return <>
        <Tabs tabs={tabs} active={activeTab} setActive={setActiveTab}/>
        <div className={'tab' + (fade ? ' visible' : '')}>
             {
                images.map(tab => {
                    if (tab.tab === activeTab) {
                        return tab.works.map((image, i) => {
                            return <Link key={i} href={links[i] ?? ''}>
                                <div className="tab-content">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={image.min} width={450} height={250} alt={image.name}/>
                                    <span className="label">{image.name}</span>
                                </div>
                            </Link>
                        })
                    }
                })
            }
        </div>
    </>
}

export default Gallery
