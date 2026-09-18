#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun } = require('docx');

const ROOT = path.resolve(__dirname, '..');
const DATA = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'lp-campaign-mapping.json'), 'utf8'));

const NAVY = '0B2540';
const INK = '2E445A';
const INDIGO = '4E5AC7';

const money = (n, c) => (c === 'AED' ? 'AED ' : 'GBP ') + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Group mapping rows by account
const byAccount = {};
DATA.mapping.forEach(row => {
  const key = row.account + '||' + row.cid + '||' + row.currency;
  if (!byAccount[key]) byAccount[key] = [];
  byAccount[key].push(row);
});

const blocks = [
  new Paragraph({
    spacing: { after: 160 },
    children: [new TextRun({ text: 'Rise Group | Landing Page Switch Plan', font: 'Calibri', size: 36, bold: true, color: NAVY })],
  }),
  new Paragraph({
    spacing: { after: 320 },
    children: [new TextRun({ text: 'Last 30 days. Prepared 2026-09-18.', font: 'Calibri', size: 20, color: INDIGO })],
  }),
];

Object.keys(byAccount).forEach(key => {
  const [name, cid, currency] = key.split('||');
  const rows = byAccount[key];

  // Account header
  blocks.push(new Paragraph({
    spacing: { before: 320, after: 40 },
    children: [new TextRun({ text: name, font: 'Calibri', size: 30, bold: true, color: NAVY })],
  }));
  blocks.push(new Paragraph({
    spacing: { after: 200 },
    children: [
      new TextRun({ text: 'Customer ID: ', font: 'Calibri', size: 20, bold: true, color: INK }),
      new TextRun({ text: cid + '   |   Currency: ' + currency, font: 'Calibri', size: 20, color: INK }),
    ],
  }));

  rows.forEach(row => {
    // LP URL line
    blocks.push(new Paragraph({
      spacing: { before: 160, after: 60 },
      children: [new TextRun({ text: 'Landing page: ' + row.current_url, font: 'Calibri', size: 24, bold: true, color: INDIGO })],
    }));
    // Campaign
    blocks.push(new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({ text: 'Campaign: ', font: 'Calibri', size: 22, bold: true, color: NAVY }),
        new TextRun({ text: row.campaign_name + '  (' + money(row.spend_30d, row.currency) + ' in 30 days)', font: 'Calibri', size: 22, color: INK }),
      ],
    }));
    // Keywords
    blocks.push(new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({ text: 'Top keywords: ', font: 'Calibri', size: 22, bold: true, color: NAVY }),
        new TextRun({ text: row.top_keywords.slice(0, 3).join(', '), font: 'Calibri', size: 22, italics: true, color: INK }),
      ],
    }));
    // New page
    blocks.push(new Paragraph({
      spacing: { after: 160 },
      children: [
        new TextRun({ text: 'New landing page: ', font: 'Calibri', size: 22, bold: true, color: NAVY }),
        new TextRun({ text: row.new_url, font: 'Calibri', size: 22, color: INK }),
      ],
    }));
  });
});

const doc = new Document({
  creator: 'Rocket SaaS',
  title: 'Rise Group | Landing Page Switch Plan',
  styles: { default: { document: { run: { font: 'Calibri' } } } },
  sections: [{
    properties: { page: { margin: { top: 900, right: 900, bottom: 900, left: 900 } } },
    children: blocks,
  }],
});

const OUT = path.join(ROOT, 'outputs', 'Rise-Group-LP-Switch-Plan.docx');
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUT, buf);
  console.log('Wrote: ' + OUT + ' (' + buf.length + ' bytes)');
});
