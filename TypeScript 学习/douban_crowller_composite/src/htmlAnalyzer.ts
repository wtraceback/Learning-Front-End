import { IAnalyzer } from './index';

export default class Analyzer implements IAnalyzer {
    public analyze(html: string, filepath: string) {
        return html
    }
}