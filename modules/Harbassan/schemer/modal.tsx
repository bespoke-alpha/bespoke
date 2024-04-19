import { S, SVGIcons } from "/modules/Delusoire/stdlib/index.js";

import { useSearchBar } from "/modules/Delusoire/stdlib/lib/components/index.js";
import schemeManager from "./schemes.js";
import { createIconComponent } from "/modules/Delusoire/stdlib/lib/createIconComponent.js";

function isValidHex(hex: string) {
	const regex = /^#[0-9A-Fa-f]{6}$/;
	return regex.test(hex);
}

const SchemerModal = () => {
	const [modalScheme, setModalScheme] = S.React.useState(schemeManager.getCurrScheme());
	const [schemes, setSchemes] = S.React.useState(schemeManager.getSchemes());
	const [searchbar, search] = useSearchBar({ placeholder: "Search Schemes", expanded: true });

	function setScheme(scheme) {
		setModalScheme(scheme);
		schemeManager.toggleScheme(scheme.name);
	}

	function updateField(name, value) {
		const newFields = { ...modalScheme.fields, [name]: value };
		setModalScheme({ ...modalScheme, fields: newFields });

		if (!isValidHex(value)) return;
		schemeManager.updateLocal(modalScheme.name, newFields);
	}

	function addScheme() {
		setScheme(schemeManager.createLocal({ name: "New Custom", fields: modalScheme.fields }));
		setSchemes(schemeManager.getSchemes());
	}

	function remScheme(scheme) {
		schemeManager.deleteLocal(scheme.name);
		setSchemes(schemeManager.getSchemes());
		setScheme(schemeManager.getScheme("def"));
	}

	function renameScheme(scheme, newName) {
		schemeManager.renameLocal(scheme.name, newName);
		setSchemes(schemeManager.getSchemes());
	}

	function copyObj() {
		const css = JSON.stringify(modalScheme);
		// @ts-ignore
		S.Platform.getClipboardAPI().copy(css);
	}

	const LocalInfo = () => {
		const [name, setName] = S.React.useState(modalScheme.name);

		return (
			<div className="scheme-info">
				<input
					className="scheme-name"
					readOnly={!modalScheme.local}
					placeholder="Custom Scheme"
					value={modalScheme.local ? name : `${name} (static)`}
					onChange={(e) => setName(e.target.value)}
				/>
				{modalScheme.local && [
					<button onClick={() => remScheme(modalScheme)}>Delete</button>,
					<button onClick={(e) => renameScheme(modalScheme, name)}>Rename</button>,
				]}
				<button onClick={copyObj}>Copy Object</button>
			</div>
		);
	};

	const filteredSchemes = schemes.filter((scheme) => scheme.name.toLowerCase().includes(search.toLowerCase()));

	return (
		<div className="schemer-container">
			<div className="scheme-list-container">
				<ul>
					{searchbar}
					<S.ReactComponents.MenuItem
						leadingIcon={createIconComponent({
							icon: SVGIcons.plus2px,
						})}
						divider="after"
						onClick={addScheme}
					>
						Create New Local
					</S.ReactComponents.MenuItem>
					<ul className="scheme-list">
						{filteredSchemes.map(scheme => (
							<S.ReactComponents.MenuItem onClick={() => setScheme(scheme)}>{scheme.name}</S.ReactComponents.MenuItem>
						))}
					</ul>
				</ul>
			</div>
			<div className="splitter" />
			<div className="scheme-fields-container">
				<LocalInfo />
				<div className="scheme-fields">
					{Object.entries(modalScheme.fields).map(([name, value]) => (
						<div className="input-row">
							<label>{name}</label>
							<input className="color-input" type="color" value={value} onChange={e => updateField(name, e.target.value)} />
							<input className="text-input" type="text" value={value} onChange={e => updateField(name, e.target.value)} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SchemerModal;