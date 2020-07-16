import React from 'react'
import useTranslation from '../hooks/useTranslation'

const Exhibit: React.FC = () => {
  const { locale, t } = useTranslation()
  return (
    <div>
      <h1>Egypt</h1>
      <img src="https://picsum.photos/200/300" alt=""/>
    </div>
  )
}

export default Exhibit