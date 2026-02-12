import { useRouter } from 'next/router';
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
import Footer from '@/components/Layout/Footer';

export async function getStaticPaths() {
  return {
    paths: [
    { params: { slug: 'buy-1' } },
    { params: { slug: 'price-1' } },
    { params: { slug: 'muscat-1' } },
    { params: { slug: 'salalah-1' } },
    { params: { slug: 'offer-1' } },
    { params: { slug: 'buy-2' } },
    { params: { slug: 'price-2' } },
    { params: { slug: 'muscat-2' } },
    { params: { slug: 'salalah-2' } },
    { params: { slug: 'offer-2' } },
    { params: { slug: 'buy-3' } },
    { params: { slug: 'price-3' } },
    { params: { slug: 'muscat-3' } },
    { params: { slug: 'salalah-3' } },
    { params: { slug: 'offer-3' } },
    { params: { slug: 'buy-4' } },
    { params: { slug: 'price-4' } },
    { params: { slug: 'muscat-4' } },
    { params: { slug: 'salalah-4' } },
    { params: { slug: 'offer-4' } },
    { params: { slug: 'buy-5' } },
    { params: { slug: 'price-5' } },
    { params: { slug: 'muscat-5' } },
    { params: { slug: 'salalah-5' } },
    { params: { slug: 'offer-5' } },
    { params: { slug: 'buy-6' } },
    { params: { slug: 'price-6' } },
    { params: { slug: 'muscat-6' } },
    { params: { slug: 'salalah-6' } },
    { params: { slug: 'offer-6' } },
    { params: { slug: 'buy-7' } },
    { params: { slug: 'price-7' } },
    { params: { slug: 'muscat-7' } },
    { params: { slug: 'salalah-7' } },
    { params: { slug: 'offer-7' } },
    { params: { slug: 'buy-8' } },
    { params: { slug: 'price-8' } },
    { params: { slug: 'muscat-8' } },
    { params: { slug: 'salalah-8' } },
    { params: { slug: 'offer-8' } },
    { params: { slug: 'buy-9' } },
    { params: { slug: 'price-9' } },
    { params: { slug: 'muscat-9' } },
    { params: { slug: 'salalah-9' } },
    { params: { slug: 'offer-9' } },
    { params: { slug: 'buy-10' } },
    { params: { slug: 'price-10' } },
    { params: { slug: 'muscat-10' } },
    { params: { slug: 'salalah-10' } },
    { params: { slug: 'offer-10' } },
    { params: { slug: 'buy-11' } },
    { params: { slug: 'price-11' } },
    { params: { slug: 'muscat-11' } },
    { params: { slug: 'salalah-11' } },
    { params: { slug: 'offer-11' } },
    { params: { slug: 'buy-12' } },
    { params: { slug: 'price-12' } },
    { params: { slug: 'muscat-12' } },
    { params: { slug: 'salalah-12' } },
    { params: { slug: 'offer-12' } },
    { params: { slug: 'buy-13' } },
    { params: { slug: 'price-13' } },
    { params: { slug: 'muscat-13' } },
    { params: { slug: 'salalah-13' } },
    { params: { slug: 'offer-13' } },
    { params: { slug: 'buy-14' } },
    { params: { slug: 'price-14' } },
    { params: { slug: 'muscat-14' } },
    { params: { slug: 'salalah-14' } },
    { params: { slug: 'offer-14' } },
    { params: { slug: 'buy-15' } },
    { params: { slug: 'price-15' } },
    { params: { slug: 'muscat-15' } },
    { params: { slug: 'salalah-15' } },
    { params: { slug: 'offer-15' } },
    { params: { slug: 'buy-16' } },
    { params: { slug: 'price-16' } },
    { params: { slug: 'muscat-16' } },
    { params: { slug: 'salalah-16' } },
    { params: { slug: 'offer-16' } },
    { params: { slug: 'buy-17' } },
    { params: { slug: 'price-17' } },
    { params: { slug: 'muscat-17' } },
    { params: { slug: 'salalah-17' } },
    { params: { slug: 'offer-17' } },
    { params: { slug: 'buy-18' } },
    { params: { slug: 'price-18' } },
    { params: { slug: 'muscat-18' } },
    { params: { slug: 'salalah-18' } },
    { params: { slug: 'offer-18' } },
    { params: { slug: 'buy-19' } },
    { params: { slug: 'price-19' } },
    { params: { slug: 'muscat-19' } },
    { params: { slug: 'salalah-19' } },
    { params: { slug: 'offer-19' } },
    { params: { slug: 'buy-20' } },
    { params: { slug: 'price-20' } },
    { params: { slug: 'muscat-20' } },
    { params: { slug: 'salalah-20' } },
    { params: { slug: 'offer-20' } },
    { params: { slug: 'buy-21' } },
    { params: { slug: 'price-21' } },
    { params: { slug: 'muscat-21' } },
    { params: { slug: 'salalah-21' } },
    { params: { slug: 'offer-21' } },
    { params: { slug: 'buy-22' } },
    { params: { slug: 'price-22' } },
    { params: { slug: 'muscat-22' } },
    { params: { slug: 'salalah-22' } },
    { params: { slug: 'offer-22' } },
    { params: { slug: 'buy-23' } },
    { params: { slug: 'price-23' } },
    { params: { slug: 'muscat-23' } },
    { params: { slug: 'salalah-23' } },
    { params: { slug: 'offer-23' } },
    { params: { slug: 'buy-24' } },
    { params: { slug: 'price-24' } },
    { params: { slug: 'muscat-24' } },
    { params: { slug: 'salalah-24' } },
    { params: { slug: 'offer-24' } },
    { params: { slug: 'buy-25' } },
    { params: { slug: 'price-25' } },
    { params: { slug: 'muscat-25' } },
    { params: { slug: 'salalah-25' } },
    { params: { slug: 'offer-25' } },
    { params: { slug: 'buy-26' } },
    { params: { slug: 'price-26' } },
    { params: { slug: 'muscat-26' } },
    { params: { slug: 'salalah-26' } },
    { params: { slug: 'offer-26' } },
    { params: { slug: 'buy-27' } },
    { params: { slug: 'price-27' } },
    { params: { slug: 'muscat-27' } },
    { params: { slug: 'salalah-27' } },
    { params: { slug: 'offer-27' } },
    { params: { slug: 'buy-28' } },
    { params: { slug: 'price-28' } },
    { params: { slug: 'muscat-28' } },
    { params: { slug: 'salalah-28' } },
    { params: { slug: 'offer-28' } },
    { params: { slug: 'buy-29' } },
    { params: { slug: 'price-29' } },
    { params: { slug: 'muscat-29' } },
    { params: { slug: 'salalah-29' } },
    { params: { slug: 'offer-29' } },
    { params: { slug: 'buy-30' } },
    { params: { slug: 'price-30' } },
    { params: { slug: 'muscat-30' } },
    { params: { slug: 'salalah-30' } },
    { params: { slug: 'offer-30' } },
    { params: { slug: 'buy-31' } },
    { params: { slug: 'price-31' } },
    { params: { slug: 'muscat-31' } },
    { params: { slug: 'salalah-31' } },
    { params: { slug: 'offer-31' } },
    { params: { slug: 'buy-32' } },
    { params: { slug: 'price-32' } },
    { params: { slug: 'muscat-32' } },
    { params: { slug: 'salalah-32' } },
    { params: { slug: 'offer-32' } },
    { params: { slug: 'buy-33' } },
    { params: { slug: 'price-33' } },
    { params: { slug: 'muscat-33' } },
    { params: { slug: 'salalah-33' } },
    { params: { slug: 'offer-33' } },
    { params: { slug: 'buy-34' } },
    { params: { slug: 'price-34' } },
    { params: { slug: 'muscat-34' } },
    { params: { slug: 'salalah-34' } },
    { params: { slug: 'offer-34' } },
    { params: { slug: 'buy-35' } },
    { params: { slug: 'price-35' } },
    { params: { slug: 'muscat-35' } },
    { params: { slug: 'salalah-35' } },
    { params: { slug: 'offer-35' } },
    { params: { slug: 'buy-36' } },
    { params: { slug: 'price-36' } },
    { params: { slug: 'muscat-36' } },
    { params: { slug: 'salalah-36' } },
    { params: { slug: 'offer-36' } },
    { params: { slug: 'buy-37' } },
    { params: { slug: 'price-37' } },
    { params: { slug: 'muscat-37' } },
    { params: { slug: 'salalah-37' } },
    { params: { slug: 'offer-37' } },
    { params: { slug: 'buy-38' } },
    { params: { slug: 'price-38' } },
    { params: { slug: 'muscat-38' } },
    { params: { slug: 'salalah-38' } },
    { params: { slug: 'offer-38' } },
    { params: { slug: 'buy-39' } },
    { params: { slug: 'price-39' } },
    { params: { slug: 'muscat-39' } },
    { params: { slug: 'salalah-39' } },
    { params: { slug: 'offer-39' } },
    { params: { slug: 'buy-40' } },
    { params: { slug: 'price-40' } },
    { params: { slug: 'muscat-40' } },
    { params: { slug: 'salalah-40' } },
    { params: { slug: 'offer-40' } },
    { params: { slug: 'buy-41' } },
    { params: { slug: 'price-41' } },
    { params: { slug: 'muscat-41' } },
    { params: { slug: 'salalah-41' } },
    { params: { slug: 'offer-41' } },
    { params: { slug: 'buy-42' } },
    { params: { slug: 'price-42' } },
    { params: { slug: 'muscat-42' } },
    { params: { slug: 'salalah-42' } },
    { params: { slug: 'offer-42' } },
    { params: { slug: 'buy-43' } },
    { params: { slug: 'price-43' } },
    { params: { slug: 'muscat-43' } },
    { params: { slug: 'salalah-43' } },
    { params: { slug: 'offer-43' } },
    { params: { slug: 'buy-44' } },
    { params: { slug: 'price-44' } },
    { params: { slug: 'muscat-44' } },
    { params: { slug: 'salalah-44' } },
    { params: { slug: 'offer-44' } },
    { params: { slug: 'buy-45' } },
    { params: { slug: 'price-45' } },
    { params: { slug: 'muscat-45' } },
    { params: { slug: 'salalah-45' } },
    { params: { slug: 'offer-45' } },
    { params: { slug: 'buy-46' } },
    { params: { slug: 'price-46' } },
    { params: { slug: 'muscat-46' } },
    { params: { slug: 'salalah-46' } },
    { params: { slug: 'offer-46' } },
    { params: { slug: 'buy-47' } },
    { params: { slug: 'price-47' } },
    { params: { slug: 'muscat-47' } },
    { params: { slug: 'salalah-47' } },
    { params: { slug: 'offer-47' } },
    { params: { slug: 'buy-48' } },
    { params: { slug: 'price-48' } },
    { params: { slug: 'muscat-48' } },
    { params: { slug: 'salalah-48' } },
    { params: { slug: 'offer-48' } },
    { params: { slug: 'buy-49' } },
    { params: { slug: 'price-49' } },
    { params: { slug: 'muscat-49' } },
    { params: { slug: 'salalah-49' } },
    { params: { slug: 'offer-49' } },
    { params: { slug: 'buy-50' } },
    { params: { slug: 'price-50' } },
    { params: { slug: 'muscat-50' } },
    { params: { slug: 'salalah-50' } },
    { params: { slug: 'offer-50' } },
    { params: { slug: 'buy-51' } },
    { params: { slug: 'price-51' } },
    { params: { slug: 'muscat-51' } },
    { params: { slug: 'salalah-51' } },
    { params: { slug: 'offer-51' } },
    { params: { slug: 'buy-52' } },
    { params: { slug: 'price-52' } },
    { params: { slug: 'muscat-52' } },
    { params: { slug: 'salalah-52' } },
    { params: { slug: 'offer-52' } },
    { params: { slug: 'buy-53' } },
    { params: { slug: 'price-53' } },
    { params: { slug: 'muscat-53' } },
    { params: { slug: 'salalah-53' } },
    { params: { slug: 'offer-53' } },
    { params: { slug: 'buy-54' } },
    { params: { slug: 'price-54' } },
    { params: { slug: 'muscat-54' } },
    { params: { slug: 'salalah-54' } },
    { params: { slug: 'offer-54' } },
    { params: { slug: 'buy-55' } },
    { params: { slug: 'price-55' } },
    { params: { slug: 'muscat-55' } },
    { params: { slug: 'salalah-55' } },
    { params: { slug: 'offer-55' } },
    { params: { slug: 'buy-56' } },
    { params: { slug: 'price-56' } },
    { params: { slug: 'muscat-56' } },
    { params: { slug: 'salalah-56' } },
    { params: { slug: 'offer-56' } },
    { params: { slug: 'buy-57' } },
    { params: { slug: 'price-57' } },
    { params: { slug: 'muscat-57' } },
    { params: { slug: 'salalah-57' } },
    { params: { slug: 'offer-57' } },
    { params: { slug: 'buy-58' } },
    { params: { slug: 'price-58' } },
    { params: { slug: 'muscat-58' } },
    { params: { slug: 'salalah-58' } },
    { params: { slug: 'offer-58' } },
    { params: { slug: 'buy-59' } },
    { params: { slug: 'price-59' } },
    { params: { slug: 'muscat-59' } },
    { params: { slug: 'salalah-59' } },
    { params: { slug: 'offer-59' } },
    { params: { slug: 'buy-60' } },
    { params: { slug: 'price-60' } },
    { params: { slug: 'muscat-60' } },
    { params: { slug: 'salalah-60' } },
    { params: { slug: 'offer-60' } },
    { params: { slug: 'buy-61' } },
    { params: { slug: 'price-61' } },
    { params: { slug: 'muscat-61' } },
    { params: { slug: 'salalah-61' } },
    { params: { slug: 'offer-61' } },
    { params: { slug: 'buy-62' } },
    { params: { slug: 'price-62' } },
    { params: { slug: 'muscat-62' } },
    { params: { slug: 'salalah-62' } },
    { params: { slug: 'offer-62' } },
    { params: { slug: 'buy-63' } },
    { params: { slug: 'price-63' } },
    { params: { slug: 'muscat-63' } },
    { params: { slug: 'salalah-63' } },
    { params: { slug: 'offer-63' } },
    { params: { slug: 'buy-64' } },
    { params: { slug: 'price-64' } },
    { params: { slug: 'muscat-64' } },
    { params: { slug: 'salalah-64' } },
    { params: { slug: 'offer-64' } },
    { params: { slug: 'buy-65' } },
    { params: { slug: 'price-65' } },
    { params: { slug: 'muscat-65' } },
    { params: { slug: 'salalah-65' } },
    { params: { slug: 'offer-65' } },
    { params: { slug: 'buy-66' } },
    { params: { slug: 'price-66' } },
    { params: { slug: 'muscat-66' } },
    { params: { slug: 'salalah-66' } },
    { params: { slug: 'offer-66' } },
    { params: { slug: 'buy-67' } },
    { params: { slug: 'price-67' } },
    { params: { slug: 'muscat-67' } },
    { params: { slug: 'salalah-67' } },
    { params: { slug: 'offer-67' } },
    { params: { slug: 'buy-68' } },
    { params: { slug: 'price-68' } },
    { params: { slug: 'muscat-68' } },
    { params: { slug: 'salalah-68' } },
    { params: { slug: 'offer-68' } },
    { params: { slug: 'buy-69' } },
    { params: { slug: 'price-69' } },
    { params: { slug: 'muscat-69' } },
    { params: { slug: 'salalah-69' } },
    { params: { slug: 'offer-69' } },
    { params: { slug: 'buy-70' } },
    { params: { slug: 'price-70' } },
    { params: { slug: 'muscat-70' } },
    { params: { slug: 'salalah-70' } },
    { params: { slug: 'offer-70' } },
    { params: { slug: 'buy-71' } },
    { params: { slug: 'price-71' } },
    { params: { slug: 'muscat-71' } },
    { params: { slug: 'salalah-71' } },
    { params: { slug: 'offer-71' } },
    { params: { slug: 'buy-72' } },
    { params: { slug: 'price-72' } },
    { params: { slug: 'muscat-72' } },
    { params: { slug: 'salalah-72' } },
    { params: { slug: 'offer-72' } },
    { params: { slug: 'buy-73' } },
    { params: { slug: 'price-73' } },
    { params: { slug: 'muscat-73' } },
    { params: { slug: 'salalah-73' } },
    { params: { slug: 'offer-73' } },
    { params: { slug: 'buy-74' } },
    { params: { slug: 'price-74' } },
    { params: { slug: 'muscat-74' } },
    { params: { slug: 'salalah-74' } },
    { params: { slug: 'offer-74' } },
    { params: { slug: 'buy-75' } },
    { params: { slug: 'price-75' } },
    { params: { slug: 'muscat-75' } },
    { params: { slug: 'salalah-75' } },
    { params: { slug: 'offer-75' } },
    { params: { slug: 'buy-76' } },
    { params: { slug: 'price-76' } },
    { params: { slug: 'muscat-76' } },
    { params: { slug: 'salalah-76' } },
    { params: { slug: 'offer-76' } },
    { params: { slug: 'buy-77' } },
    { params: { slug: 'price-77' } },
    { params: { slug: 'muscat-77' } },
    { params: { slug: 'salalah-77' } },
    { params: { slug: 'offer-77' } },
    { params: { slug: 'buy-78' } },
    { params: { slug: 'price-78' } },
    { params: { slug: 'muscat-78' } },
    { params: { slug: 'salalah-78' } },
    { params: { slug: 'offer-78' } },
    { params: { slug: 'buy-79' } },
    { params: { slug: 'price-79' } },
    { params: { slug: 'muscat-79' } },
    { params: { slug: 'salalah-79' } },
    { params: { slug: 'offer-79' } },
    { params: { slug: 'buy-80' } },
    { params: { slug: 'price-80' } },
    { params: { slug: 'muscat-80' } },
    { params: { slug: 'salalah-80' } },
    { params: { slug: 'offer-80' } },
    { params: { slug: 'buy-81' } },
    { params: { slug: 'price-81' } },
    { params: { slug: 'muscat-81' } },
    { params: { slug: 'salalah-81' } },
    { params: { slug: 'offer-81' } },
    { params: { slug: 'buy-82' } },
    { params: { slug: 'price-82' } },
    { params: { slug: 'muscat-82' } },
    { params: { slug: 'salalah-82' } },
    { params: { slug: 'offer-82' } },
    { params: { slug: 'buy-83' } },
    { params: { slug: 'price-83' } },
    { params: { slug: 'muscat-83' } },
    { params: { slug: 'salalah-83' } },
    { params: { slug: 'offer-83' } },
    { params: { slug: 'buy-84' } },
    { params: { slug: 'price-84' } },
    { params: { slug: 'muscat-84' } },
    { params: { slug: 'salalah-84' } },
    { params: { slug: 'offer-84' } },
    { params: { slug: 'buy-85' } },
    { params: { slug: 'price-85' } },
    { params: { slug: 'muscat-85' } },
    { params: { slug: 'salalah-85' } },
    { params: { slug: 'offer-85' } },
    { params: { slug: 'buy-86' } },
    { params: { slug: 'price-86' } },
    { params: { slug: 'muscat-86' } },
    { params: { slug: 'salalah-86' } },
    { params: { slug: 'offer-86' } },
    { params: { slug: 'buy-87' } },
    { params: { slug: 'price-87' } },
    { params: { slug: 'muscat-87' } },
    { params: { slug: 'salalah-87' } },
    { params: { slug: 'offer-87' } },
    { params: { slug: 'buy-88' } },
    { params: { slug: 'price-88' } },
    { params: { slug: 'muscat-88' } },
    { params: { slug: 'salalah-88' } },
    { params: { slug: 'offer-88' } },
    { params: { slug: 'buy-89' } },
    { params: { slug: 'price-89' } },
    { params: { slug: 'muscat-89' } },
    { params: { slug: 'salalah-89' } },
    { params: { slug: 'offer-89' } },
    { params: { slug: 'buy-90' } },
    { params: { slug: 'price-90' } },
    { params: { slug: 'muscat-90' } },
    { params: { slug: 'salalah-90' } },
    { params: { slug: 'offer-90' } },
    { params: { slug: 'buy-91' } },
    { params: { slug: 'price-91' } },
    { params: { slug: 'muscat-91' } },
    { params: { slug: 'salalah-91' } },
    { params: { slug: 'offer-91' } },
    { params: { slug: 'buy-92' } },
    { params: { slug: 'price-92' } },
    { params: { slug: 'muscat-92' } },
    { params: { slug: 'salalah-92' } },
    { params: { slug: 'offer-92' } },
    { params: { slug: 'buy-93' } },
    { params: { slug: 'price-93' } },
    { params: { slug: 'muscat-93' } },
    { params: { slug: 'salalah-93' } },
    { params: { slug: 'offer-93' } },
    { params: { slug: 'buy-94' } },
    { params: { slug: 'price-94' } },
    { params: { slug: 'muscat-94' } },
    { params: { slug: 'salalah-94' } },
    { params: { slug: 'offer-94' } },
    { params: { slug: 'buy-95' } },
    { params: { slug: 'price-95' } },
    { params: { slug: 'muscat-95' } },
    { params: { slug: 'salalah-95' } },
    { params: { slug: 'offer-95' } },
    { params: { slug: 'buy-96' } },
    { params: { slug: 'price-96' } },
    { params: { slug: 'muscat-96' } },
    { params: { slug: 'salalah-96' } },
    { params: { slug: 'offer-96' } },
    { params: { slug: 'buy-97' } },
    { params: { slug: 'price-97' } },
    { params: { slug: 'muscat-97' } },
    { params: { slug: 'salalah-97' } },
    { params: { slug: 'offer-97' } },
    { params: { slug: 'buy-98' } },
    { params: { slug: 'price-98' } },
    { params: { slug: 'muscat-98' } },
    { params: { slug: 'salalah-98' } },
    { params: { slug: 'offer-98' } },
    { params: { slug: 'buy-99' } },
    { params: { slug: 'price-99' } },
    { params: { slug: 'muscat-99' } },
    { params: { slug: 'salalah-99' } },
    { params: { slug: 'offer-99' } },
    { params: { slug: 'buy-100' } },
    { params: { slug: 'price-100' } },
    { params: { slug: 'muscat-100' } },
    { params: { slug: 'salalah-100' } },
    { params: { slug: 'offer-100' } },
    { params: { slug: 'buy-101' } },
    { params: { slug: 'price-101' } },
    { params: { slug: 'muscat-101' } },
    { params: { slug: 'salalah-101' } },
    { params: { slug: 'offer-101' } },
    { params: { slug: 'buy-102' } },
    { params: { slug: 'price-102' } },
    { params: { slug: 'muscat-102' } },
    { params: { slug: 'salalah-102' } },
    { params: { slug: 'offer-102' } },
    { params: { slug: 'buy-103' } },
    { params: { slug: 'price-103' } },
    { params: { slug: 'muscat-103' } },
    { params: { slug: 'salalah-103' } },
    { params: { slug: 'offer-103' } },
    { params: { slug: 'buy-104' } },
    { params: { slug: 'price-104' } },
    { params: { slug: 'muscat-104' } },
    { params: { slug: 'salalah-104' } },
    { params: { slug: 'offer-104' } },
    { params: { slug: 'buy-105' } },
    { params: { slug: 'price-105' } },
    { params: { slug: 'muscat-105' } },
    { params: { slug: 'salalah-105' } },
    { params: { slug: 'offer-105' } },
    { params: { slug: 'buy-106' } },
    { params: { slug: 'price-106' } },
    { params: { slug: 'muscat-106' } },
    { params: { slug: 'salalah-106' } },
    { params: { slug: 'offer-106' } },
    { params: { slug: 'buy-107' } },
    { params: { slug: 'price-107' } },
    { params: { slug: 'muscat-107' } },
    { params: { slug: 'salalah-107' } },
    { params: { slug: 'offer-107' } },
    { params: { slug: 'buy-108' } },
    { params: { slug: 'price-108' } },
    { params: { slug: 'muscat-108' } },
    { params: { slug: 'salalah-108' } },
    { params: { slug: 'offer-108' } },
    { params: { slug: 'buy-109' } },
    { params: { slug: 'price-109' } },
    { params: { slug: 'muscat-109' } },
    { params: { slug: 'salalah-109' } },
    { params: { slug: 'offer-109' } },
    { params: { slug: 'buy-110' } },
    { params: { slug: 'price-110' } },
    { params: { slug: 'muscat-110' } },
    { params: { slug: 'salalah-110' } },
    { params: { slug: 'offer-110' } },
    { params: { slug: 'buy-111' } },
    { params: { slug: 'price-111' } },
    { params: { slug: 'muscat-111' } },
    { params: { slug: 'salalah-111' } },
    { params: { slug: 'offer-111' } },
    { params: { slug: 'buy-112' } },
    { params: { slug: 'price-112' } },
    { params: { slug: 'muscat-112' } },
    { params: { slug: 'salalah-112' } },
    { params: { slug: 'offer-112' } },
    { params: { slug: 'buy-113' } },
    { params: { slug: 'price-113' } },
    { params: { slug: 'muscat-113' } },
    { params: { slug: 'salalah-113' } },
    { params: { slug: 'offer-113' } },
    { params: { slug: 'buy-114' } },
    { params: { slug: 'price-114' } },
    { params: { slug: 'muscat-114' } },
    { params: { slug: 'salalah-114' } },
    { params: { slug: 'offer-114' } },
    { params: { slug: 'buy-115' } },
    { params: { slug: 'price-115' } },
    { params: { slug: 'muscat-115' } },
    { params: { slug: 'salalah-115' } },
    { params: { slug: 'offer-115' } },
    { params: { slug: 'buy-116' } },
    { params: { slug: 'price-116' } },
    { params: { slug: 'muscat-116' } },
    { params: { slug: 'salalah-116' } },
    { params: { slug: 'offer-116' } },
    { params: { slug: 'buy-117' } },
    { params: { slug: 'price-117' } },
    { params: { slug: 'muscat-117' } },
    { params: { slug: 'salalah-117' } },
    { params: { slug: 'offer-117' } },
    { params: { slug: 'buy-118' } },
    { params: { slug: 'price-118' } },
    { params: { slug: 'muscat-118' } },
    { params: { slug: 'salalah-118' } },
    { params: { slug: 'offer-118' } },
    { params: { slug: 'buy-119' } },
    { params: { slug: 'price-119' } },
    { params: { slug: 'muscat-119' } },
    { params: { slug: 'salalah-119' } },
    { params: { slug: 'offer-119' } },
    { params: { slug: 'buy-120' } },
    { params: { slug: 'price-120' } },
    { params: { slug: 'muscat-120' } },
    { params: { slug: 'salalah-120' } },
    { params: { slug: 'offer-120' } },
    { params: { slug: 'buy-121' } },
    { params: { slug: 'price-121' } },
    { params: { slug: 'muscat-121' } },
    { params: { slug: 'salalah-121' } },
    { params: { slug: 'offer-121' } },
    { params: { slug: 'buy-122' } },
    { params: { slug: 'price-122' } },
    { params: { slug: 'muscat-122' } },
    { params: { slug: 'salalah-122' } },
    { params: { slug: 'offer-122' } },
    { params: { slug: 'buy-123' } },
    { params: { slug: 'price-123' } },
    { params: { slug: 'muscat-123' } },
    { params: { slug: 'salalah-123' } },
    { params: { slug: 'offer-123' } },
    { params: { slug: 'buy-124' } },
    { params: { slug: 'price-124' } },
    { params: { slug: 'muscat-124' } },
    { params: { slug: 'salalah-124' } },
    { params: { slug: 'offer-124' } },
    { params: { slug: 'buy-125' } },
    { params: { slug: 'price-125' } },
    { params: { slug: 'muscat-125' } },
    { params: { slug: 'salalah-125' } },
    { params: { slug: 'offer-125' } },
    { params: { slug: 'buy-126' } },
    { params: { slug: 'price-126' } },
    { params: { slug: 'muscat-126' } },
    { params: { slug: 'salalah-126' } },
    { params: { slug: 'offer-126' } },
    { params: { slug: 'buy-127' } },
    { params: { slug: 'price-127' } },
    { params: { slug: 'muscat-127' } },
    { params: { slug: 'salalah-127' } },
    { params: { slug: 'offer-127' } },
    { params: { slug: 'buy-128' } },
    { params: { slug: 'price-128' } },
    { params: { slug: 'muscat-128' } },
    { params: { slug: 'salalah-128' } },
    { params: { slug: 'offer-128' } },
    { params: { slug: 'buy-129' } },
    { params: { slug: 'price-129' } },
    { params: { slug: 'muscat-129' } },
    { params: { slug: 'salalah-129' } },
    { params: { slug: 'offer-129' } },
    { params: { slug: 'buy-130' } },
    { params: { slug: 'price-130' } },
    { params: { slug: 'muscat-130' } },
    { params: { slug: 'salalah-130' } },
    { params: { slug: 'offer-130' } },
    { params: { slug: 'buy-131' } },
    { params: { slug: 'price-131' } },
    { params: { slug: 'muscat-131' } },
    { params: { slug: 'salalah-131' } },
    { params: { slug: 'offer-131' } },
    { params: { slug: 'buy-132' } },
    { params: { slug: 'price-132' } },
    { params: { slug: 'muscat-132' } },
    { params: { slug: 'salalah-132' } },
    { params: { slug: 'offer-132' } },
    { params: { slug: 'buy-133' } },
    { params: { slug: 'price-133' } },
    { params: { slug: 'muscat-133' } },
    { params: { slug: 'salalah-133' } },
    { params: { slug: 'offer-133' } },
    { params: { slug: 'buy-134' } },
    { params: { slug: 'price-134' } },
    { params: { slug: 'muscat-134' } },
    { params: { slug: 'salalah-134' } },
    { params: { slug: 'offer-134' } },
    { params: { slug: 'buy-135' } },
    { params: { slug: 'price-135' } },
    { params: { slug: 'muscat-135' } },
    { params: { slug: 'salalah-135' } },
    { params: { slug: 'offer-135' } },
    { params: { slug: 'buy-136' } },
    { params: { slug: 'price-136' } },
    { params: { slug: 'muscat-136' } },
    { params: { slug: 'salalah-136' } },
    { params: { slug: 'offer-136' } },
    { params: { slug: 'buy-137' } },
    { params: { slug: 'price-137' } },
    { params: { slug: 'muscat-137' } },
    { params: { slug: 'salalah-137' } },
    { params: { slug: 'offer-137' } },
    { params: { slug: 'buy-138' } },
    { params: { slug: 'price-138' } },
    { params: { slug: 'muscat-138' } },
    { params: { slug: 'salalah-138' } },
    { params: { slug: 'offer-138' } },
    { params: { slug: 'buy-139' } },
    { params: { slug: 'price-139' } },
    { params: { slug: 'muscat-139' } },
    { params: { slug: 'salalah-139' } },
    { params: { slug: 'offer-139' } },
    { params: { slug: 'buy-140' } },
    { params: { slug: 'price-140' } },
    { params: { slug: 'muscat-140' } },
    { params: { slug: 'salalah-140' } },
    { params: { slug: 'offer-140' } },
    { params: { slug: 'buy-141' } },
    { params: { slug: 'price-141' } },
    { params: { slug: 'muscat-141' } },
    { params: { slug: 'salalah-141' } },
    { params: { slug: 'offer-141' } },
    { params: { slug: 'buy-142' } },
    { params: { slug: 'price-142' } },
    { params: { slug: 'muscat-142' } },
    { params: { slug: 'salalah-142' } },
    { params: { slug: 'offer-142' } }
    ],
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const fs = require('fs');
  const path = require('path');
  const pagesPath = path.join(process.cwd(), 'public/mass-seo-data/pages.json');
  const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
  const page = pages.find(p => p.slug === params.slug);
  if (!page) return { notFound: true };
  
  const productsPath = path.join(process.cwd(), 'src/data/products-data.json');
  const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  const product = productsData.find(p => p.id === page.productId);
  if (!product) return { notFound: true };
  
  return { props: { page, product } };
}

export default function MassSEOPage({ page, product }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const reviews = getProductReviews(product?.id);
  const faqs = getProductFAQs(product?.id);
  const averageRating = getAverageRating(product?.id);

  useEffect(() => {
    if (product) gtag.viewItem(product);
  }, [product]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) dispatch(addToCart(product));
    gtag.addToCart(product, quantity);
    toast.success(`تمت إضافة ${quantity} من ${product.name} إلى السلة`);
  };

  return (
    <>
      <Header />
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
        <meta name="keywords" content={page.keywords} />
        <link rel="canonical" href={page.canonicalUrl} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.description} />
        <meta property="og:image" content={product.mainImage} />
        <meta property="og:url" content={page.canonicalUrl} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify(product.richSchema || {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            image: product.mainImage,
            description: page.description,
            offers: { '@type': 'Offer', price: product.price, priceCurrency: 'OMR', availability: 'https://schema.org/InStock' }
          })
        }} />
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-12 overflow-x-hidden">
        <button className="bg-white border border-gray-300 px-6 py-2 rounded-lg mb-8 hover:bg-light-gray transition" onClick={() => router.back()}>← العودة</button>

        <div className="bg-white rounded-2xl shadow-card p-8 grid md:grid-cols-2 gap-12 overflow-hidden">
          <div className="space-y-4">
            <div className="relative h-96 rounded-xl overflow-hidden bg-light-gray">
              <img src={selectedImage || product.mainImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3">
              <img src={product.mainImage} alt={product.name} onClick={() => setSelectedImage(product.mainImage)} className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition ${selectedImage === product.mainImage || !selectedImage ? 'border-primary' : 'border-transparent'}`} />
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-dark">{page.title}</h1>
            <div className="flex gap-3 flex-wrap">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm">{product.category}</span>
              <span className="bg-green-100 text-success px-3 py-1 rounded-lg text-sm">متوفر</span>
            </div>
            <div className="flex items-center gap-4 pb-6 border-b">
              <span className="text-5xl font-bold text-primary">{product.price} ر.ع</span>
            </div>
            {page.description && (
              <div>
                <h3 className="text-xl font-bold text-dark mb-3">وصف المنتج</h3>
                <p className="text-gray-800 leading-relaxed text-base font-medium whitespace-pre-line">{page.description}</p>
              </div>
            )}
            <div className="flex gap-3 text-sm">
              <Link href="/return-policy" className="text-primary hover:underline">🔄 سياسة الإرجاع</Link>
              <span className="text-gray-300">|</span>
              <Link href="/shipping-policy" className="text-primary hover:underline">🚚 سياسة الشحن</Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-bold text-dark">الكمية:</label>
                <div className="flex items-center gap-4 bg-light-gray px-4 py-2 rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 bg-white rounded-lg font-bold text-primary hover:bg-primary hover:text-white transition">-</button>
                  <span className="text-xl font-bold min-w-[40px] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 bg-white rounded-lg font-bold text-primary hover:bg-primary hover:text-white transition">+</button>
                </div>
              </div>
              <button onClick={handleAddToCart} className="w-full bg-primary text-white py-4 rounded-full text-lg font-bold hover:bg-primary-dark transition shadow-lg hover:shadow-xl">أضف إلى السلة</button>
            </div>
          </div>
        </div>

        {/* زر اشتري الآن الثابت */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-primary">{product.price} ر.ع</span>
            </div>
            <button 
              onClick={() => {
                handleAddToCart();
                router.push('/checkout');
              }}
              className="flex-1 max-w-md bg-green-600 text-white py-4 px-8 rounded-full text-lg font-bold hover:bg-green-700 transition shadow-lg"
            >
              🛒 اشتري الآن
            </button>
          </div>
        </div>

        <div className="mt-12 mb-24 bg-white rounded-2xl shadow-card p-4 md:p-8 overflow-hidden">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b mb-6 overflow-x-auto">
            <button onClick={() => setActiveTab('description')} className={`pb-4 px-4 sm:px-6 font-bold transition whitespace-nowrap ${activeTab === 'description' ? 'border-b-4 border-primary text-primary' : 'text-gray-500'}`}>الوصف</button>
            <button onClick={() => setActiveTab('reviews')} className={`pb-4 px-4 sm:px-6 font-bold transition whitespace-nowrap ${activeTab === 'reviews' ? 'border-b-4 border-primary text-primary' : 'text-gray-500'}`}>التقييمات ({reviews.length})</button>
            <button onClick={() => setActiveTab('faqs')} className={`pb-4 px-4 sm:px-6 font-bold transition whitespace-nowrap ${activeTab === 'faqs' ? 'border-b-4 border-primary text-primary' : 'text-gray-500'}`}>الأسئلة الشائعة</button>
          </div>

          {activeTab === 'description' && <div className="prose max-w-none"><p className="text-gray-800 leading-relaxed text-base font-medium whitespace-pre-line">{page.description}</p></div>}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {reviews.length > 0 ? (
                <>
                  <div className="flex items-center gap-4 pb-6 border-b">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-primary">{averageRating}</div>
                      <div className="flex gap-1 mt-2">{[...Array(5)].map((_, i) => <span key={i} className={`text-2xl ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>)}</div>
                      <div className="text-gray-500 mt-1">{reviews.length} تقييم</div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {reviews.map((review, index) => (
                      <div key={index} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-dark">{review.name}</h4>
                              {review.verified && <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">✓ مشتري موثق</span>}
                            </div>
                            <div className="flex gap-1 mt-1">{[...Array(5)].map((_, i) => <span key={i} className={`${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>)}</div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : <div className="text-center py-12 text-gray-500"><p className="text-xl">لا توجد تقييمات بعد</p><p className="mt-2">كن أول من يقيم هذا المنتج</p></div>}
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-4">
              {faqs.length > 0 ? faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg p-6 hover:shadow-md transition">
                  <h4 className="font-bold text-dark mb-3 flex items-start gap-2"><span className="text-primary text-xl">❓</span>{faq.q}</h4>
                  <p className="text-gray-600 leading-relaxed mr-7">{faq.a}</p>
                </div>
              )) : <div className="text-center py-12 text-gray-500"><p className="text-xl">لا توجد أسئلة شائعة لهذا المنتج</p></div>}
            </div>
          )}
        </div>
            </div>
      <Footer />
    </>
  );
}
