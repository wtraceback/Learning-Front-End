import { IAnalyzer } from './douban_top250';

export default class Analyzer implements IAnalyzer {
    public analyze(html: string, filepath: string) {
        return html
    }
}