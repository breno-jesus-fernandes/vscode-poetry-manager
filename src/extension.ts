// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import { CustomSidebarViewProvider } from './customSidebarViewProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Console diagnostic information (console.log) and errors (console.error)
	// Will only be executed once when your extension is activated
	console.log('Congratulations, your extension "Poetry Manager" is active!');

	const provider = new CustomSidebarViewProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			CustomSidebarViewProvider.viewType,
		  provider
		)
	  );

	  context.subscriptions.push(
		vscode.commands.registerCommand("vscodeSidebar.menu.view", () => {
		  const message = "A new poetry project was found! Install project?";
		  const options =  ['yes', 'no'];
		  vscode.window.showInformationMessage(message, ...options).then(selection => {
			console.log(selection);
			if (selection === 'yes') {
				console.log('Entering in my if condition');
				const cp = require('child_process');
				cp.exec('where poetry', (err: string, stdout: string, stderr: string) => {
					
					console.log('stdout: ' + stdout);
    				console.log('stderr: ' + stderr);
					if (err) {
						console.log('error: ' + err);
					}
				});
				
				
			} else {
				console.log('Entering in my else condition');
			}
			
		  });;
		})
	  );

	// Command has been defined in the package.json file
	// Provide the implementation of the command with registerCommand
	// CommandId parameter must match the command field in package.json
	let openWebView = vscode.commands.registerCommand('vscodeSidebar.openview', () => {
		// Display a message box to the user
		vscode.window.showInformationMessage('Command " Sidebar View [vscodeSidebar.openview] " called.');
	});

	context.subscriptions.push(openWebView);
}

// this method is called when your extension is deactivated
export function deactivate() {}
