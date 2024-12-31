import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
  },
  logo: {
    width: 100,
    marginBottom: 20,
  },
  date: {
    marginBottom: 30,
    textAlign: 'right',
  },
  content: {
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  signature: {
    marginTop: 50,
  },
});

type PDFDocumentProps = {
  content: string;
  logo?: string;
};

export default function PDFDocument({ content, logo }: PDFDocumentProps) {
  const today = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {logo && <Image style={styles.logo} src={logo} />}
        </View>
        
        <Text style={styles.date}>{today}</Text>
        
        <View style={styles.content}>
          <Text>{content}</Text>
        </View>
        
        <View style={styles.signature}>
          <Text>Signature :</Text>
        </View>
      </Page>
    </Document>
  );
}