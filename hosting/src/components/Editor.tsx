/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { ChangeEvent } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/theme-tomorrow';

import classes from './Editor.module.css';
import { languages } from '../utils/constants';

languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

interface Props {
  autocomplete: boolean;
  onCodeChange: (code: string) => void;
  onLangChange: (language: string) => void;
  code: string;
  language: string;
}

class Editor extends React.Component<Props, unknown> {
  constructor(props: Props) {
    super(props);

    this.onLangChange = this.onLangChange.bind(this);
  }

  onLangChange(event: ChangeEvent<HTMLSelectElement>):void {
    const lang = event.target.value;
    this.props.onLangChange(lang);
  }

  render(): JSX.Element {
    return (
      <div className={classes.container}>
        <select
          onChange={(e) => this.props.onLangChange(e.target.value)}
          value={this.props.language}
        >
          {
            languages.map((lang) => (
              <option
                value={lang}
                key={lang}
              >
                {lang}
              </option>
            ))
          }
        </select>
        <div className={classes.wrapper}>
          <AceEditor
            theme="tomorrow"
            name="code_editor"
            fontSize={20}
            style={{ width: '100%', height: '100%' }}
            setOptions={{
              enableBasicAutocompletion: this.props.autocomplete,
              enableLiveAutocompletion: this.props.autocomplete,
              enableSnippets: this.props.autocomplete,
              showLineNumbers: true,
              tabSize: 4,
            }}
            mode={this.props.language}
            onChange={this.props.onCodeChange}
            value={this.props.code}
          />
        </div>
      </div>
    );
  }
}
export default Editor;
