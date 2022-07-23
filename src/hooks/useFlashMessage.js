import { useState, useEffect } from 'react'

import { useLocation } from 'react-router-dom'

export const useFlashMessage = (defaultValue) => {
	const [flashMessage, setFlashMessage] = useState(defaultValue)

    const { state } = useLocation()

	useEffect(() => {
		if (state){
			if (state.message){
				setFlashMessage(state.message)
			}
		}
	}, [state])

    return [ flashMessage, setFlashMessage ]
}