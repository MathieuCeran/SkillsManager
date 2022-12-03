/**
 * @license Copyright (c) 2014-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import BalloonEditor from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import Mention from '@ckeditor/ckeditor5-mention/src/mention.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js';

class Editor extends BalloonEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
	Autoformat,
	AutoLink,
	BlockQuote,
	Bold,
	CloudServices,
	Essentials,
	FontSize,
	Italic,
	Link,
	List,
	Mention,
	Paragraph,
	PasteFromOffice,
	TextTransformation
];

// Editor configuration.
Editor.defaultConfig = {
	toolbar: {
		items: [
			'bold',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'|',
			'blockQuote',
			'undo',
			'redo'
		]
	},
	language: 'fr'
};

export default Editor;
