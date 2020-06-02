import dependency from './dependency';
import actions from './actions';
import request from './request';

function registerSuggestions(monaco) {
  monaco.languages.registerCompletionItemProvider('javascript', {
    // @ts-ignore
    provideCompletionItems(model, position) {
      // 其他提示
      return {
        suggestions: [
          ...dependency(monaco),
          ...actions(monaco),
          ...request(monaco),
        ],
      };
    },
  });
}

export default registerSuggestions;
