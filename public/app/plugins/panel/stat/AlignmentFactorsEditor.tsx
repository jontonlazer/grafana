import React, { PureComponent } from 'react';
import { Button, Label } from '@grafana/ui';
import { StandardEditorProps, DisplayValueAlignmentFactors, StandardEditorContext } from '@grafana/data';
import { AlignmentFactorTextEditor } from './AlignmentFactorText';
import { AlignmentFactorTextLengthEditor } from './AlignmentFactorTextLength';

export interface AlignmentFactorsEditorOptions {
  getStandardAlignmentFactors: (ctx: StandardEditorContext<any>) => DisplayValueAlignmentFactors;
}

type Props = StandardEditorProps<DisplayValueAlignmentFactors, any, AlignmentFactorsEditorOptions>;

export class AlignmentFactorsEditor extends PureComponent<Props> {
  onStartEditing = () => {
    const { item, context } = this.props;
    const factors = item.settings?.getStandardAlignmentFactors(context);
    this.props.onChange(factors ?? { text: '????' });
  };

  onStopEditing = () => {
    this.props.onChange(undefined);
  };

  onFactorsChanged = (update: Partial<DisplayValueAlignmentFactors>) => {
    const { value, onChange } = this.props;
    onChange({
      ...value,
      ...update,
    });
  };

  render() {
    const { value } = this.props;
    if (!value) {
      return (
        <div>
          <Button onClick={this.onStartEditing} variant="secondary" size="md">
            Use explicit factors
          </Button>
        </div>
      );
    }

    return (
      <div>
        <Label>Title length</Label>
        <AlignmentFactorTextLengthEditor value={value.title} onChange={v => this.onFactorsChanged({ title: v })} />
        <Label>Text length</Label>
        <AlignmentFactorTextLengthEditor value={value.text} onChange={v => this.onFactorsChanged({ text: v })} />
        <Label>Prefix length</Label>
        <AlignmentFactorTextLengthEditor value={value.prefix} onChange={v => this.onFactorsChanged({ prefix: v })} />
        <Label>Suffix length</Label>
        <AlignmentFactorTextLengthEditor value={value.suffix} onChange={v => this.onFactorsChanged({ suffix: v })} />
        <br />
        <Button onClick={this.onStopEditing} variant="secondary" size="md">
          Use default factors
        </Button>
      </div>
    );
  }
}