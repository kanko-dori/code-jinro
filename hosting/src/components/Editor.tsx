import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-tomorrow";
import { ChangeEvent } from 'react';

const languages = [
  "javascript",
  "c_cpp",
  "java",
  "elixir",
  "golang",
  "typescript",
  "python",
  "haxe",
  "ruby",
  "rust",
  "php",
];
languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

interface Props {
  autocomplete: boolean;
}
interface State {
  mode: string;
}

class Editor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onCodeChange = this.onCodeChange.bind(this);
    this.onLangChange = this.onLangChange.bind(this);
    this.state = {
      mode: "javascript"
    };
  }

  render() {
    return (
      <div>
        <select onChange={this.onLangChange} defaultValue={languages[0]}>
          {
            languages.map(
              (lang, i) => 
                <option
                  value={lang}
                  key={lang}
                >
                  {lang}
                </option>
            )
          }
        </select>
        <AceEditor
          theme="tomorrow"
          name="code_editor"
          fontSize={20}
          setOptions={{
            enableBasicAutocompletion: this.props.autocomplete,
            enableLiveAutocompletion: this.props.autocomplete,
            enableSnippets: this.props.autocomplete,
            showLineNumbers: true,
            tabSize: 4
          }}
          mode={this.state.mode}
          onChange={this.onCodeChange}
        >
        </AceEditor>
      </div>
    );
  }

  onLangChange(event: ChangeEvent<HTMLSelectElement>) {
    this.setState({
      mode: event.target.value
    });
  }

  onCodeChange() {

  }
};
export default Editor;