import { Converter, ConfigData, ConversionOptions } from '../types';

export class JSONConverter implements Converter {
  parse(content: string): ConfigData {
    try {
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Failed to parse JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  stringify(data: ConfigData, options: ConversionOptions = {}): string {
    const indent = options.indent ?? (options.pretty ? 2 : 0);
    const processedData = options.sort ? this.sortKeys(data) : data;
    
    return JSON.stringify(processedData, null, indent);
  }

  private sortKeys(obj: any): any {
    if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
      return obj;
    }
    
    const sorted: any = {};
    Object.keys(obj).sort().forEach(key => {
      sorted[key] = this.sortKeys(obj[key]);
    });
    return sorted;
  }
}

