import React from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'


const categoryTranslationMap = { // parsed from JSON file (updated w/ API)
	'exhibition': 'exposition',
	'exhibCN': 'exposition',
}

const categoryToComponentMap = new Map([ // internal dictionnary of "homepages" that we maintain
	// ['404', dynamic(() => import('../../components/404Page'))],
	[undefined, dynamic(() => import('../../components/HopePage'))],
	['exposition', dynamic(() => import('../../components/Exhibit'))]
])

const categoryAndSlugToComponentMap = new Map([ // internal dictionnary of "category pages" that we maintain
	['exposition', dynamic(() => import('../../components/Exhibit'))]
])

function getComponentFromCategory (category, slug) {
	const dictionary = slug ? categoryAndSlugToComponentMap : categoryToComponentMap

	if(dictionary.has(category))
		return dictionary.get(category)

	const translatedCategory = categoryTranslationMap[category]
	if(translatedCategory && dictionary.has(translatedCategory))
		return dictionary.get(translatedCategory)
	
	return dictionary.get('404') // 404
}

const RouterPage: React.FC = () => {

	const router = useRouter()
	const query = router.query // undefined on first render
	const [lang, category, slug] = query.particles || []

	console.log(lang, category, slug)

	const DynamicPageComponent = getComponentFromCategory(category, slug)

	return (
		<Layout titleKey="about">
			<DynamicPageComponent lang={lang} slug={slug}/>
		</Layout>
	)
}

export default RouterPage
