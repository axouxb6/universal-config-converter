import TOML from '@iarna/toml';
import { Converter, ConfigData, ConversionOptions } from '../types';

export class TOMLConverter implements Converter {
  parse(content: string): ConfigData {
    try {
      return TOML.parse(content) as ConfigData;
    } catch (error) {
      throw new Error(`Failed to parse TOML: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  stringify(data: ConfigData, options: ConversionOptions = {}): string {
    try {
      const processedData = options.sort ? this.sortKeys(data) : data;
      return TOML.stringify(processedData);
    } catch (error) {
      throw new Error(`Failed to stringify TOML: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
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

