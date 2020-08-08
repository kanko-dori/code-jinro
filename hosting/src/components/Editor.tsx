/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/theme-tomorrow';

import classes from './Editor.module.css';
import { languages } from '../utils/constants';
import { Language } from '../types/types';

languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

interface Props {
  autocomplete: boolean;
  onCodeChange: (code: string) => void;
  onLangChange: (language: Language) => void;
  code: string;
  language: Language;
}

const Editor: React.FC<Props> = (props: Props) => (
  <div className={classes.container}>
    <select
      onChange={(e) => props.onLangChange(e.target.value as Language)}
      value={props.language}
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
          enableBasicAutocompletion: props.autocomplete,
          enableLiveAutocompletion: props.autocomplete,
          enableSnippets: props.autocomplete,
          showLineNumbers: true,
          tabSize: 4,
        }}
        mode={props.language}
        onChange={props.onCodeChange}
        value={props.code}
      />
    </div>
  </div>
);

export default Editor;
