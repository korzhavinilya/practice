import { useMemo, useRef, useState } from 'react'

interface SpeechRecognitionAlternative {
	transcript: string
}

interface SpeechRecognitionResult {
	0: SpeechRecognitionAlternative
	isFinal: boolean
}

interface SpeechRecognitionEvent extends Event {
	results: SpeechRecognitionResult[]
}

interface SpeechRecognitionErrorEvent extends Event {
	error: string
}

interface SpeechRecognitionInstance {
	continuous: boolean
	interimResults: boolean
	lang: string
	start: () => void
	stop: () => void
	onresult: ((event: SpeechRecognitionEvent) => void) | null
	onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
	onend: (() => void) | null
}

interface BrowserWindowWithSpeech extends Window {
	SpeechRecognition?: new () => SpeechRecognitionInstance
	webkitSpeechRecognition?: new () => SpeechRecognitionInstance
}

interface UseSpeechRecognition {
	transcript: string
	isListening: boolean
	errorMessage: string
	isSupported: boolean
	startListening: () => void
	stopListening: () => void
	resetTranscript: () => void
}

export function useSpeechRecognition(): UseSpeechRecognition {
	const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
	const [transcript, setTranscript] = useState('')
	const [isListening, setIsListening] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const speechRecognitionApi = useMemo(() => {
		const windowWithSpeech = window as BrowserWindowWithSpeech
		return windowWithSpeech.SpeechRecognition ?? windowWithSpeech.webkitSpeechRecognition
	}, [])

	const isSupported = Boolean(speechRecognitionApi)

	const startListening = () => {
		if (!speechRecognitionApi) {
			setErrorMessage('Speech recognition is not supported in this browser')
			return
		}

		if (!recognitionRef.current) {
			recognitionRef.current = new speechRecognitionApi()
			recognitionRef.current.continuous = true
			recognitionRef.current.interimResults = true
			recognitionRef.current.lang = 'en-US'
		}

		setErrorMessage('')
		setIsListening(true)

		recognitionRef.current.onresult = (event) => {
			const mergedTranscript = event.results
				.map((result) => result[0]?.transcript ?? '')
				.join(' ')
				.trim()
			setTranscript(mergedTranscript)
		}

		recognitionRef.current.onerror = (event) => {
			setErrorMessage(`Microphone error: ${event.error}`)
			setIsListening(false)
		}

		recognitionRef.current.onend = () => {
			setIsListening(false)
		}

		recognitionRef.current.start()
	}

	const stopListening = () => {
		recognitionRef.current?.stop()
		setIsListening(false)
	}

	const resetTranscript = () => {
		setTranscript('')
		setErrorMessage('')
	}

	return {
		transcript,
		isListening,
		errorMessage,
		isSupported,
		startListening,
		stopListening,
		resetTranscript
	}
}
