import { useState, useEffect, useRef } from 'react';

export interface debounceProps {
	value: string;
	delay: number;
}

function useDebounce({ value, delay }: debounceProps) {
	const [debounceValue, setDebounceValue] = useState<string>(value);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => setDebounceValue(value), delay);
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return debounceValue;
}

export default useDebounce;
