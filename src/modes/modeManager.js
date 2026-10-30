export class ModeManager {
	static _initialized = false;

	/**
		shouldApplyAction ie.: e=>e.shiftKey && keyMaps.has(e.key)
	*/
	static activate(defaultMode, modes, shouldApplyAction = () => true){
		if (!modes.some(m => m.name == defaultMode)) ModeManager._throwNoExistentMode(defaultMode);
		ModeManager.defaultMode = defaultMode;
		ModeManager.modes = modes;
		ModeManager.shouldApplyAction = shouldApplyAction;
		ModeManager._initialized = true;
		ModeManager.__setFirstMode(defaultMode);
		ModeManager._addGeneralListener();
	}

	static setMode(modeName){
		ModeManager._checkInitialization();
		const cur = ModeManager.modes.find(m => m.name == (modeName || ModeManager.defaultMode));
		if (!cur) ModeManager._throwNoExistentMode(modeName);
		ModeManager._changeMode(cur);
	}

	static __setFirstMode(modeName){
		ModeManager._checkInitialization();
		const cur = ModeManager.modes.find(m => m.name == (modeName || ModeManager.defaultMode));
		if (!cur) ModeManager._throwNoExistentMode(modeName);
		ModeManager.current = cur;
		ModeManager.current.start();
	}

	static reset(){
		ModeManager._checkInitialization();
		ModeManager.setMode();
	}

	static handle(e){
		ModeManager._checkInitialization();
		ModeManager.current.handle(e);
	}

	static _changeMode(mode){
		ModeManager.current.end();
		ModeManager.current = mode;
		ModeManager.current.start();
	}

	static _throwNoExistentMode(modeName){
		throw new Error(`No '${modeName}' mode on mode List`);
	}

	static _checkInitialization(){
		if (!ModeManager._initialized) throw new Error(`Mode Manager has not been initialized yet.`);
	}

	static _addGeneralListener(){
		document.addEventListener('keydown', (event) => {
			ModeManager.shouldApplyAction(event) && this.handle(event);
		});
	}
}
