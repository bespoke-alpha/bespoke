import { S, SVGIcons } from "/modules/Delusoire/stdlib/index.js";

import { useSearchBar } from "/modules/Delusoire/stdlib/lib/components/index.js";
import paletteManager from "./paletteManager.js";
import { createIconComponent } from "/modules/Delusoire/stdlib/lib/createIconComponent.js";
import { startCase } from "/modules/Delusoire/stdlib/deps.js";

function isValidHex(hex: string) {
	const regex = /^#[0-9A-Fa-f]{6}$/;
	return regex.test(hex);
}

const Modal = () => {
	const [modalPalette, setModalPalette] = S.React.useState(paletteManager.getCurrPalette());
	const [palettes, setPalettes] = S.React.useState(paletteManager.getPalettes());
	const [searchbar, search] = useSearchBar({ placeholder: "Search Palettes", expanded: true });

	function setPalette(palette) {
		setModalPalette(palette);
		paletteManager.togglePalette(palette.name);
	}

	function updateField(name, value) {
		const newFields = { ...modalPalette.fields, [name]: value };
		setModalPalette({ ...modalPalette, fields: newFields });

		if (!isValidHex(value)) return;
		paletteManager.updateLocal(modalPalette.name, newFields);
	}

	function addPalette() {
		setPalette(paletteManager.createLocal({ name: "New Custom", fields: modalPalette.fields }));
		setPalettes(paletteManager.getPalettes());
	}

	function remPalette(palette) {
		paletteManager.deleteLocal(palette.name);
		setPalettes(paletteManager.getPalettes());
		setPalette(paletteManager.getPalette("def"));
	}

	function renamePalette(palette, newName) {
		paletteManager.renameLocal(palette.name, newName);
		setPalettes(paletteManager.getPalettes());
	}

	function copyObj() {
		const css = JSON.stringify(modalPalette);
		// @ts-ignore
		S.Platform.getClipboardAPI().copy(css);
	}

	const LocalInfo = () => {
		const [name, setName] = S.React.useState(modalPalette.name);

		return (
			<div className="palette-info">
				<input
					className="palette-name"
					readOnly={!modalPalette.local}
					placeholder="Custom Palette"
					value={modalPalette.local ? name : `${name} (static)`}
					onChange={e => setName(e.target.value)}
				/>
				{modalPalette.local && [
					<button onClick={() => remPalette(modalPalette)}>Delete</button>,
					<button onClick={e => renamePalette(modalPalette, name)}>Rename</button>,
				]}
				<button onClick={copyObj}>Copy Object</button>
			</div>
		);
	};

	const filteredPalettes = palettes.filter(palette => palette.name.toLowerCase().includes(search.toLowerCase()));

	return (
		<div className="palette-modal-container">
			<div className="palette-list-container">
				<ul>
					{searchbar}
					<S.ReactComponents.MenuItem
						leadingIcon={createIconComponent({
							icon: SVGIcons.plus2px,
						})}
						divider="after"
						onClick={addPalette}
					>
						Create New Palette
					</S.ReactComponents.MenuItem>
					<ul className="palette-list">
						{filteredPalettes.map(palette => (
							<S.ReactComponents.MenuItem
								trailingIcon={
									palette.name == modalPalette.name &&
									createIconComponent({
										icon: SVGIcons.check,
									})
								}
								onClick={() => setPalette(palette)}
							>
								{palette.name}
							</S.ReactComponents.MenuItem>
						))}
					</ul>
				</ul>
			</div>
			<div className="palette-fields-container">
				<LocalInfo />
				<div className="palette-fields">
					{Object.entries(modalPalette.fields).map(([name, value]) => (
						<div className="input-row">
							<label>{startCase(name)}</label>
							<input className="color-input" type="color" value={value} onChange={e => updateField(name, e.target.value)} />
							<input className="text-input" type="text" value={value} onChange={e => updateField(name, e.target.value)} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Modal;
