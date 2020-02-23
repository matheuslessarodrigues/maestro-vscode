'use strict';

const vscode = require('vscode');

function activate(context) {
	const provider = new MaestroConfigurationProvider();
	context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('maestro', provider));
	const factory = new MaestroDebugAdapterDescriptorFactory();
	context.subscriptions.push(vscode.debug.registerDebugAdapterDescriptorFactory('maestro', factory));
}

function deactivate() {
}

class MaestroConfigurationProvider {
	resolveDebugConfiguration(_folder, config, _token) {
		if (!config.type && !config.request && !config.name) {
			const editor = vscode.window.activeTextEditor;
			if (editor && editor.document.languageId === 'maestro') {
				config.type = 'maestro';
				config.name = 'Maestro Debugger';
				config.request = 'attach';
			}
		}
		return config;
	}
}

class MaestroDebugAdapterDescriptorFactory {
	createDebugAdapterDescriptor(_session, _executable) {
		return new vscode.DebugAdapterServer(47474);
	}
}

module.exports = {
	activate,
	deactivate
}