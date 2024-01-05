import fs from 'fs';
import path from 'path';
import { JSONConverter } from './converters/json';
import { YAMLConverter } from './converters/yaml';
import { TOMLConverter } from './converters/toml';
import { ENVConverter } from './converters/env';
import { ConfigFormat, ConfigData, Converter, ConversionOptions } from './types';

export class UniversalConfigConverter {
  private converters: Map<ConfigFormat, Converter>;

  constructor() {
    this.converters = new Map<ConfigFormat, Converter>();
    this.converters.set('json', new JSONConverter());
    this.converters.set('yaml', new YAMLConverter());
    this.converters.set('toml', new TOMLConverter());
    this.converters.set('env', new ENVConverter());
  }

  /**
   * Convert config from one format to another
   */
  convert(
    content: string,
    fromFormat: ConfigFormat,
    toFormat: ConfigFormat,
    options: ConversionOptions = {}
  ): string {
    const fromConverter = this.converters.get(fromFormat);
    const toConverter = this.converters.get(toFormat);

    if (!fromConverter) {
      throw new Error(`Unsupported source format: ${fromFormat}`);
    }
    if (!toConverter) {
      throw new Error(`Unsupported target format: ${toFormat}`);
    }

    const data = fromConverter.parse(content);
    return toConverter.stringify(data, options);
  }

  /**
   * Convert file from one format to another
   */
  convertFile(
    inputPath: string,
    outputPath: string,
    options: ConversionOptions = {}
  ): void {
    const fromFormat = this.detectFormat(inputPath);
    const toFormat = this.detectFormat(outputPath);

    const content = fs.readFileSync(inputPath, 'utf-8');
    const converted = this.convert(content, fromFormat, toFormat, options);
    fs.writeFileSync(outputPath, converted, 'utf-8');
  }

  /**
   * Detect format from file extension
   */
  private detectFormat(filePath: string): ConfigFormat {
    const ext = path.extname(filePath).toLowerCase();
    
    switch (ext) {
      case '.json':
        return 'json';
      case '.yaml':
      case '.yml':
        return 'yaml';
      case '.toml':
        return 'toml';
      case '.env':
        return 'env';
      default:
        throw new Error(`Cannot detect format from extension: ${ext}`);
    }
  }

  /**
   * Parse config from string
   */
  parse(content: string, format: ConfigFormat): ConfigData {
    const converter = this.converters.get(format);
    if (!converter) {
      throw new Error(`Unsupported format: ${format}`);
    }
    return converter.parse(content);
  }

  /**
   * Stringify config data to format
   */
  stringify(data: ConfigData, format: ConfigFormat, options: ConversionOptions = {}): string {
    const converter = this.converters.get(format);
    if (!converter) {
      throw new Error(`Unsupported format: ${format}`);
    }
    return converter.stringify(data, options);
  }
}

export * from './types';
export { JSONConverter, YAMLConverter, TOMLConverter, ENVConverter };

