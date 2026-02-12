const fs = require('fs');
const path = require('path');

console.log('🔧 إصلاح Layout في صفحات المقالات...');

const seoPagePath = path.join(process.cwd(), 'src/pages/seo/[slug].jsx');

// قراءة الملف الحالي
const currentContent = fs.readFileSync(seoPagePath, 'utf8');

// إضافة import للـ Layout
const newImports = `import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';
import { products } from '@/data/products';
import { getProductReviews, getProductFAQs, getAverageRating } from '@/data/productReviews';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import * as gtag from '@/lib/gtag';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';`;

// استبدال المحتوى الرئيسي لإضافة Layout
const newContent = currentContent
  .replace(/import \{ useRouter \} from 'next\/router';\nimport \{ useDispatch \} from 'react-redux';\nimport \{ addToCart \} from '@\/redux\/features\/cartSlice';\nimport \{ products \} from '@\/data\/products';\nimport \{ getProductReviews, getProductFAQs, getAverageRating \} from '@\/data\/productReviews';\nimport \{ toast \} from 'react-toastify';\nimport Link from 'next\/link';\nimport Head from 'next\/head';\nimport \{ useState, useEffect \} from 'react';\nimport \* as gtag from '@\/lib\/gtag';/, newImports)
  .replace(
    /return \(\s*<>\s*<Head>/,
    `return (
    <>
      <Header />
      <Head>`
  )
  .replace(
    /<\/div>\s*<\/>\s*\);/,
    `      </div>
      <Footer />
    </>
  );`
  );

// كتابة الملف المحدث
fs.writeFileSync(seoPagePath, newContent);

console.log('✅ تم إصلاح Layout في صفحات المقالات');
console.log('📄 الملف المحدث: src/pages/seo/[slug].jsx');
console.log('🎯 الآن الهيدر والفوتر سيظهران في جميع صفحات المقالات');