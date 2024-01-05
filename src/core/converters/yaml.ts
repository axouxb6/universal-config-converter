import yaml from 'js-yaml';
import { Converter, ConfigData, ConversionOptions } from '../types';

export class YAMLConverter implements Converter {
  parse(content: string): ConfigData {
    try {
      return yaml.load(content) as ConfigData;
    } catch (error) {
      throw new Error(`Failed to parse YAML: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  stringify(data: ConfigData, options: ConversionOptions = {}): string {
    const processedData = options.sort ? this.sortKeys(data) : data;
    
    return yaml.dump(processedData, {
      indent: options.indent ?? 2,
      lineWidth: -1,
      noRefs: true,
      sortKeys: options.sort ?? false
    });
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

