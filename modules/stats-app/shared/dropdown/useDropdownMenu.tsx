import { useState } from "react";
import DropdownMenu from "./dropdown";

interface OptionProps {
	id: string;
	name: string;
}

const useDropdownMenu = (options: OptionProps[], storageVariable?: string) => {
	const initialOptionID = storageVariable && Spicetify.LocalStorage.get(`${storageVariable}:active-option`);
	const initialOption = initialOptionID && options.find(e => e.id === initialOptionID);
	const [activeOption, setActiveOption] = useState(initialOption || options[0]);
	const [availableOptions, setAvailableOptions] = useState(options);
	const dropdown = (
		<DropdownMenu
			options={availableOptions}
			activeOption={activeOption}
			switchCallback={option => {
				setActiveOption(option);
				if (storageVariable) Spicetify.LocalStorage.set(`${storageVariable}:active-option`, option.id);
			}}
		/>
	);

	return [dropdown, activeOption, setActiveOption, setAvailableOptions] as const;
};

export default useDropdownMenu;
