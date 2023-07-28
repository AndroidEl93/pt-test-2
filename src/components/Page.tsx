import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface ITranscriptData {
	prevTranscript: string;
	transcript: string;
}

function Page() {
	const [data, setData] = useState<ITranscriptData>({ prevTranscript: '', transcript: '' });
	const { finalTranscript, listening, resetTranscript, browserSupportsSpeechRecognition, isMicrophoneAvailable } =
		useSpeechRecognition();

	useEffect(() => {
		const diff: string = `${finalTranscript}`.replace(data.prevTranscript, '');
		const result: string = finalTranscript ? data.transcript + diff + ` (${Math.floor(Math.random() * 1000)})` : '';
		setData({ prevTranscript: finalTranscript, transcript: result });
	}, [finalTranscript]);

	return (
		<div className="page">
			{!browserSupportsSpeechRecognition ? (
				<div className="info">Ваш браузер не поддерживает функцию распознавания речи</div>
			) : (
				<>
					{
						<div className={'content' + (!data.transcript ? ' info' : '')}>
							{data.transcript
								? data.transcript
								: !isMicrophoneAvailable
								? 'Разрешите доступ к вашему микрофону, чтобы начать запись'
								: 'Нажмите на кнопку и расскажите что-нибудь интересное'}
						</div>
					}

					<div className="buttons_wrap">
						<div
							className={
								'record_button button' + (isMicrophoneAvailable && listening ? ' button_active' : '')
							}
							onClick={
								listening
									? SpeechRecognition.stopListening
									: () =>
											SpeechRecognition.startListening({
												continuous: true,
												language: 'ru-Ru',
											})
							}
						>
							<img src="/img/micro.svg" alt="record" />
						</div>
						<div className="reset_button button" onClick={resetTranscript}>
							<img src="/img/reset.svg" alt="reset" />
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Page;
