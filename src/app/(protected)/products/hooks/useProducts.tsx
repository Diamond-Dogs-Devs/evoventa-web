import { useMemo, useState } from "react";
import { FormikValues } from "formik";
import {
  useCustomSWR,
  fetcher,
  useCustomMutation,
  uploadImageToCloudinary,
} from "@/shared/api";
import { useToast } from "@/shared/overlay-manager";
import { ToastContent } from "@/shared/ui";
import { usePagination, CLOUDINARY_TYPES } from "@/shared/utils";
import { ProductI } from "../types/product.types";

export const useProducts = () => {
  const { open } = useToast();
  const { currentPage, pageSize, onPaginationChange } = usePagination();

  const productsKey = `/products?page=${currentPage}&limit=${pageSize}`;

  const { data, loading, error } = useCustomSWR<{
    data: ProductI[];
    meta: { lastPage: number };
  }>(productsKey, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    onError: () => {
      open({
        type: "error",
        content: (
          <ToastContent
            title="Error"
            subtitle="Ha ocurrido un error cargando los productos"
          />
        ),
      });
    },
  });

  const [barcodeSearch, setBarcodeSearch] = useState<string | null>(null);
  const barcodeKey = barcodeSearch ? `/products?search=${barcodeSearch}` : null;

  const { data: barcodeData, loading: barcodeLoading } = useCustomSWR<{
    data: ProductI[];
  }>(barcodeKey, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const barcodeProduct: ProductI | null = useMemo(
    () => barcodeData?.data?.[0] ?? null,
    [barcodeData],
  );

  const {
    post,
    patch,
    delete: remove,
    loading: mutationLoading,
  } = useCustomMutation({
    url: "/products",
    mutateKey: productsKey,
    onError: () => {
      open({
        type: "error",
        content: (
          <ToastContent
            title="Error"
            subtitle="No se pudo realizar la operación"
          />
        ),
      });
    },
    onSuccess: () => {
      open({
        type: "success",
        content: (
          <ToastContent
            title="Éxito"
            subtitle="Operación realizada correctamente"
          />
        ),
      });
    },
  });

  const handleCreateProduct = async (values: FormikValues) => {
    let imageUrl = "";
    let imagePublicId = "";

    if (values.image instanceof File) {
      const uploadResult = await uploadImageToCloudinary(
        values.image,
        CLOUDINARY_TYPES.PRODUCTS,
      );

      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    }

    post({
      name: values.name,
      price: values.price,
      barcode: values.barcode,
      brand: values.brand,
      category: values.category,
      status: values.status,
      imageUrl,
      imagePublicId,
    });
  };

  const handleUpdateProduct = async (values: FormikValues) => {
    const id = values.id;

    let imageUrl = values.imageUrl;
    let imagePublicId = values.imagePublicId;

    if (values.image instanceof File) {
      const uploadResult = await uploadImageToCloudinary(
        values.image,
        CLOUDINARY_TYPES.PRODUCTS,
      );

      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    }

    patch(`/products/${id}`, {
      name: values.name,
      price: values.price,
      barcode: values.barcode,
      brand: values.brand,
      category: values.category,
      status: values.status,

      imageUrl,
      imagePublicId,
    });
  };

  const handleDeleteProduct = (id: number) => {
    remove(`/products/${id}`);
  };

  return {
    products: data?.data ?? [],
    totalPages: data?.meta?.lastPage ?? 0,
    loading,
    error,
    mutationLoading,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    currentPage,
    pageSize,
    onPaginationChange,
    barcodeSearch,
    setBarcodeSearch,
    barcodeProduct,
    barcodeLoading,
  };
};
