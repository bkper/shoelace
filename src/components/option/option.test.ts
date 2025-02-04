import '../../../dist/shoelace.js';
import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import type SlOption from './option.js';

describe('<sl-option>', () => {
  it('passes accessibility test', async () => {
    const el = await fixture<SlOption>(html`
      <sl-select label="Select one">
        <sl-option value="1">Option 1</sl-option>
        <sl-option value="2">Option 2</sl-option>
        <sl-option value="3">Option 3</sl-option>
        <sl-option value="4" disabled>Disabled</sl-option>
      </sl-select>
    `);
    await expect(el).to.be.accessible();
  });

  it('default properties', async () => {
    const el = await fixture<SlOption>(html` <sl-option>Test</sl-option> `);

    expect(el.value).to.equal('');
    expect(el.disabled).to.be.false;
    expect(el.getAttribute('aria-disabled')).to.equal('false');
  });

  it('changes aria attributes', async () => {
    const el = await fixture<SlOption>(html` <sl-option>Test</sl-option> `);

    el.disabled = true;
    await aTimeout(100);
    expect(el.getAttribute('aria-disabled')).to.equal('true');
  });

  it('should convert non-string values to string', async () => {
    const el = await fixture<SlOption>(html` <sl-option>Text</sl-option> `);

    // @ts-expect-error - intentional
    el.value = 10;
    await el.updateComplete;

    expect(el.value).to.equal('10');
  });

  it('should escape HTML when calling getTextLabel()', async () => {
    const el = await fixture<SlOption>(html` <sl-option><strong>Option</strong></sl-option> `);
    expect(el.getTextLabel()).to.equal('Option');
  });
});
