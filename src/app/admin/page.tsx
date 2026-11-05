"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { BannerSlide } from "@/lib/banners";
import { Product } from "@/lib/productStore";

type CategoryRow = {
  id: number;
  name: string;
  image: string | null;
  productCount: number;
};

type ProductFormState = {
  name: string;
  description: string;
  price: string;
  amazonUrl: string;
  category: string;
  rating: string;
  imagesText: string;
  tag: string;
};

type BannerFormState = {
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  image: string;
};

const compressImage = (file: File, maxWidth = 800, maxHeight = 1000, quality = 0.7): Promise<File> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
                type: "image/webp",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          "image/webp",
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
};

const defaultProductForm: ProductFormState = {
  name: "",
  description: "",
  price: "",
  amazonUrl: "",
  category: "",
  rating: "4.5",
  imagesText: "",
  tag: "",
};

const defaultBannerForm: BannerFormState = {
  title: "",
  subtitle: "",
  cta: "Shop Now",
  href: "#products",
  image: "",
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [banners, setBanners] = useState<BannerSlide[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [productForm, setProductForm] = useState<ProductFormState>(defaultProductForm);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [bannerForm, setBannerForm] = useState<BannerFormState>(defaultBannerForm);
  const [editingBannerId, setEditingBannerId] = useState<number | null>(null);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadingCategoryImage, setUploadingCategoryImage] = useState(false);
  const [categoryImage, setCategoryImage] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error"; section: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [editingCategoryName, setEditingCategoryName] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterTag, setFilterTag] = useState("All");

  const loadData = async () => {
    const [categoriesResponse, productsResponse, bannersResponse] = await Promise.all([
      fetch("/api/categories"),
      fetch("/api/products"),
      fetch("/api/banners"),
    ]);

    if (categoriesResponse.ok) {
      const categoryData = (await categoriesResponse.json()) as CategoryRow[];
      setCategories(categoryData);
    }

    if (productsResponse.ok) {
      const productData = (await productsResponse.json()) as Product[];
      setProducts(productData);
    }

    if (bannersResponse.ok) {
      const bannerData = (await bannersResponse.json()) as BannerSlide[];
      setBanners(bannerData);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch("/api/auth/session");
      if (!response.ok) {
        setIsAuthenticated(false);
        return;
      }

      const data = (await response.json()) as { authenticated: boolean };
      setIsAuthenticated(data.authenticated);

      if (data.authenticated) {
        await loadData();
      }
    };

    void checkSession();
  }, []);

  const categoryOptions = useMemo(
    () => categories.map((category) => category.name),
    [categories],
  );

  const showMessage = (text: string, type: "success" | "error" = "success", section: string = "global") => {
    setMessage({ text, type, section });
    window.setTimeout(() => setMessage(null), 4000);
  };

  const renderMessage = (section: string) => {
    if (!message || message.section !== section) return null;
    return (
      <p
        className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium ${
          message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        }`}
      >
        {message.text}
      </p>
    );
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordError("");
    setIsLoading(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: passwordInput }),
    });

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error?: string };
      setPasswordError(errorResponse.error ?? "Login failed.");
      setIsLoading(false);
      return;
    }

    setIsAuthenticated(true);
    setPasswordInput("");
    await loadData();
    setIsLoading(false);
  };

  const handleCategoryImageUpload = async (file: File) => {
    setUploadingCategoryImage(true);
    try {
      const compressedFile = await compressImage(file, 600, 750, 0.7);
      const formData = new FormData();
      formData.append("file", compressedFile);
      const uploadResponse = await fetch("/api/categories/upload", { method: "POST", body: formData });
      if (!uploadResponse.ok) {
        showMessage("Failed to upload image.", "error", "category");
        return;
      }

      const data = (await uploadResponse.json()) as { url: string };
      setCategoryImage(data.url);
      showMessage("Category image uploaded.", "success", "category");
    } catch {
      showMessage("Failed to compress image.", "error", "category");
    } finally {
      setUploadingCategoryImage(false);
    }
  };

  const handleEditCategory = (category: CategoryRow) => {
    setEditingCategoryName(category.name);
    setNewCategory(category.name);
    setCategoryImage(category.image || "");
    window.scrollTo({ top: document.getElementById("add-category-section")?.offsetTop ?? 0, behavior: "smooth" });
  };

  const resetCategoryForm = () => {
    setEditingCategoryName(null);
    setNewCategory("");
    setCategoryImage("");
  };

  const handleSaveCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanedCategory = newCategory.trim();
    if (!cleanedCategory) return;

    const payload = { name: cleanedCategory, image: categoryImage || null };

    const response = editingCategoryName
      ? await fetch("/api/categories", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ originalName: editingCategoryName, ...payload }),
        })
      : await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error?: string };
      showMessage(errorResponse.error ?? "Failed to save category.", "error", "category");
      return;
    }

    await loadData();
    resetCategoryForm();
    showMessage(editingCategoryName ? "Category updated successfully." : "Category added successfully.", "success", "category");
  };

  const handleDeleteCategory = async (name: string) => {
    if (!window.confirm(`Delete category "${name}" and all its products?`)) {
      return;
    }

    const response = await fetch("/api/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error?: string };
      showMessage(errorResponse.error ?? "Failed to delete category.", "error", "category");
      return;
    }

    await loadData();
    showMessage("Category deleted.", "success", "category");
  };

  const handleEditProduct = (product: Product) => {
    setEditingProductId(product.id);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      amazonUrl: product.amazonUrl,
      category: product.category,
      rating: String(product.rating),
      imagesText: product.images.join("\n"),
      tag: product.tag ?? "",
    });
    window.scrollTo({ top: document.getElementById("add-product-section")?.offsetTop ?? 0, behavior: "smooth" });
  };

  const resetProductForm = () => {
    setProductForm(defaultProductForm);
    setEditingProductId(null);
  };

  const handleSaveProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const images = productForm.imagesText
      .split("\n")
      .map((image) => image.trim())
      .filter(Boolean);

    if (images.length === 0) {
      showMessage("Please add at least one image URL.", "error", "product");
      return;
    }

    if (!productForm.category) {
      showMessage("Please choose a category.", "error", "product");
      return;
    }

    const priceNumeric = parseFloat(productForm.price.replace(/[^0-9.]/g, ""));
    if (isNaN(priceNumeric)) {
      showMessage("Please enter a valid numeric price.", "error", "product");
      return;
    }

    const payload = {
      name: productForm.name.trim(),
      description: productForm.description.trim(),
      category: productForm.category,
      price: productForm.price.trim(),
      rating: Number(productForm.rating) || 4,
      amazonUrl: productForm.amazonUrl.trim(),
      images,
      tag: productForm.tag || null,
    };

    const response = editingProductId
      ? await fetch(`/api/products/${editingProductId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error?: string };
      showMessage(errorResponse.error ?? "Failed to save product.", "error", "product");
      return;
    }

    await loadData();
    resetProductForm();
    showMessage(editingProductId ? "Product updated." : "Product added successfully.", "success", "product");
  };

  const handleDeleteProduct = async (id: number, name: string) => {
    if (!window.confirm(`Delete product "${name}"?`)) {
      return;
    }

    const response = await fetch(`/api/products/${id}`, { method: "DELETE" });

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error?: string };
      showMessage(errorResponse.error ?? "Failed to delete product.", "error", "product");
      return;
    }

    await loadData();
    showMessage("Product deleted.", "success", "product");
  };

  const handleBannerUpload = async (file: File) => {
    setUploadingBanner(true);
    try {
      const compressedFile = await compressImage(file, 1000, 562, 0.7);
      const formData = new FormData();
      formData.append("file", compressedFile);

      const response = await fetch("/api/banners/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = (await response.json()) as { error?: string };
        showMessage(errorResponse.error ?? "Failed to upload image.", "error", "banner");
        return;
      }

      const data = (await response.json()) as { url: string };
      setBannerForm((prev) => ({ ...prev, image: data.url }));
      showMessage("Banner image uploaded.", "success", "banner");
    } catch {
      showMessage("Failed to compress image.", "error", "banner");
    } finally {
      setUploadingBanner(false);
    }
  };

  const resetBannerForm = () => {
    setBannerForm(defaultBannerForm);
    setEditingBannerId(null);
  };

  const handleEditBanner = (banner: BannerSlide) => {
    setEditingBannerId(banner.id);
    setBannerForm({
      title: banner.title,
      subtitle: banner.subtitle,
      cta: banner.cta,
      href: banner.href,
      image: banner.image,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveBanner = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!bannerForm.image.trim() || !bannerForm.title.trim()) {
      showMessage("Banner image and title are required.", "error", "banner");
      return;
    }

    const payload = {
      image: bannerForm.image.trim(),
      title: bannerForm.title.trim(),
      subtitle: bannerForm.subtitle.trim(),
      cta: bannerForm.cta.trim() || "Shop Now",
      href: bannerForm.href.trim() || "#products",
    };

    const response = editingBannerId
      ? await fetch(`/api/banners/${editingBannerId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/banners", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error?: string };
      showMessage(errorResponse.error ?? "Failed to save banner.", "error", "banner");
      return;
    }

    await loadData();
    resetBannerForm();
    showMessage(editingBannerId ? "Banner updated." : "Banner added.", "success", "banner");
  };

  const handleDeleteBanner = async (id: number, title: string) => {
    if (!window.confirm(`Delete banner "${title}"?`)) {
      return;
    }

    const response = await fetch(`/api/banners/${id}`, { method: "DELETE" });

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error?: string };
      showMessage(errorResponse.error ?? "Failed to delete banner.", "error");
      return;
    }

    if (editingBannerId === id) {
      resetBannerForm();
    }

    await loadData();
    showMessage("Banner deleted.");
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <main className="min-h-screen bg-slate-100 p-5 sm:p-8">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">Checking session...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-100 p-5 sm:p-8">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
          <p className="mt-2 text-sm text-slate-600">
            Enter password to manage products, categories, and banners.
          </p>

          <form onSubmit={handleLogin} className="mt-5 space-y-3">
            <input
              type="password"
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
              placeholder="Admin password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
            />
            {passwordError && (
              <p className="text-sm font-medium text-red-600">{passwordError}</p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <Link
            href="/"
            className="mt-4 inline-flex text-sm font-medium text-slate-700 underline"
          >
            Back to store
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-5 sm:p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage carousel banners, categories, and products.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              View Store
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </header>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            {editingBannerId ? "Edit Banner Slide" : "Add Banner Slide"}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Upload an image or paste a URL. These appear in the homepage carousel.<br />
            <span className="text-slate-500">Recommended: 16:9 landscape (e.g. 1600×900)</span>
          </p>
          {renderMessage("banner")}

          <form onSubmit={handleSaveBanner} className="mt-4 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Upload image
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) void handleBannerUpload(file);
                  }}
                  className="text-sm"
                />
                {uploadingBanner && (
                  <span className="text-xs text-slate-500">Uploading...</span>
                )}
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Or image URL
                <input
                  type="text"
                  value={bannerForm.image}
                  onChange={(event) =>
                    setBannerForm((prev) => ({ ...prev, image: event.target.value }))
                  }
                  placeholder="https://... or /banners/..."
                  className="rounded-lg border border-slate-300 px-3 py-2 font-normal outline-none focus:border-slate-500"
                />
              </label>
            </div>

            {bannerForm.image && (
              <div className="relative h-40 w-full max-w-md overflow-hidden rounded-lg border border-slate-200">
                <Image
                  src={bannerForm.image}
                  alt="Banner preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            <input
              type="text"
              value={bannerForm.title}
              onChange={(event) =>
                setBannerForm((prev) => ({ ...prev, title: event.target.value }))
              }
              placeholder="Banner title (e.g. SUMMER COLLECTION)"
              required
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
            />
            <input
              type="text"
              value={bannerForm.subtitle}
              onChange={(event) =>
                setBannerForm((prev) => ({ ...prev, subtitle: event.target.value }))
              }
              placeholder="Subtitle"
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                value={bannerForm.cta}
                onChange={(event) =>
                  setBannerForm((prev) => ({ ...prev, cta: event.target.value }))
                }
                placeholder="Button text (e.g. Shop Now)"
                className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              />
              <input
                type="text"
                value={bannerForm.href}
                onChange={(event) =>
                  setBannerForm((prev) => ({ ...prev, href: event.target.value }))
                }
                placeholder="Button link (e.g. #products)"
                className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              >
                {editingBannerId ? "Update Banner" : "Add Banner"}
              </button>
              {editingBannerId && (
                <button
                  type="button"
                  onClick={resetBannerForm}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <div className="mt-6 space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">
              Current Banners ({banners.length})
            </h3>
            {banners.length === 0 ? (
              <p className="text-sm text-slate-600">No banners yet.</p>
            ) : (
              banners.map((banner) => (
                <div
                  key={banner.id}
                  className="flex flex-col gap-3 rounded-xl border border-slate-200 p-3 sm:flex-row sm:items-center"
                >
                  <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900">{banner.title}</p>
                    <p className="truncate text-sm text-slate-600">{banner.subtitle}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditBanner(banner)}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDeleteBanner(banner.id, banner.title)}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section id="add-category-section" className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            {editingCategoryName ? "Edit Category" : "Add Category"}
          </h2>
          {renderMessage("category")}
          <form onSubmit={handleSaveCategory} className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={newCategory}
                onChange={(event) => setNewCategory(event.target.value)}
                placeholder="Category name"
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              />
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              >
                {editingCategoryName ? "Update Category" : "Add Category"}
              </button>
              {editingCategoryName && (
                <button
                  type="button"
                  onClick={resetCategoryForm}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
                >
                  Cancel
                </button>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Optional: Upload category image (Recommended: 4:5 portrait)
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) void handleCategoryImageUpload(file);
                  }}
                  className="text-sm"
                />
                {uploadingCategoryImage && (
                  <span className="text-xs text-slate-500">Uploading...</span>
                )}
              </label>

              {categoryImage && (
                <div className="flex items-start gap-4">
                  <div className="relative h-40 w-32 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                    <Image
                      src={categoryImage}
                      alt="Category preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setCategoryImage("")}
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
          </form>

          <div className="mt-6 max-h-[300px] space-y-2 overflow-y-auto pr-2">
            <h3 className="sticky top-0 bg-white py-1 text-sm font-semibold text-slate-900">
              Saved Categories ({categories.length})
            </h3>
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  {category.image ? (
                    <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded bg-slate-100 border border-slate-200">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="flex h-12 w-10 shrink-0 items-center justify-center rounded bg-slate-100 border border-slate-200 text-[10px] font-medium text-slate-400">
                      No Img
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-slate-900">{category.name}</p>
                    <p className="text-xs text-slate-500">
                      {category.productCount} product
                      {category.productCount === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditCategory(category)}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDeleteCategory(category.name)}
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="add-product-section" className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            {editingProductId ? "Edit Product" : "Add Product"}
          </h2>
          {renderMessage("product")}
          <form onSubmit={handleSaveProduct} className="mt-4 grid gap-4">
            <input
              type="text"
              value={productForm.name}
              onChange={(event) =>
                setProductForm((prev) => ({ ...prev, name: event.target.value }))
              }
              placeholder="Product name"
              required
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
            />
            <textarea
              value={productForm.description}
              onChange={(event) =>
                setProductForm((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
              placeholder="Product description"
              required
              rows={4}
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="number"
                min="0"
                step="0.01"
                value={productForm.price.replace(/[^0-9.]/g, "")}
                onChange={(event) =>
                  setProductForm((prev) => ({ ...prev, price: event.target.value }))
                }
                placeholder="Price (e.g. 999.00)"
                required
                className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              />
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={productForm.rating}
                onChange={(event) =>
                  setProductForm((prev) => ({ ...prev, rating: event.target.value }))
                }
                placeholder="Rating (1 to 5)"
                required
                className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              />
            </div>
            <input
              type="url"
              value={productForm.amazonUrl}
              onChange={(event) =>
                setProductForm((prev) => ({ ...prev, amazonUrl: event.target.value }))
              }
              placeholder="Amazon product link"
              required
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <select
                value={productForm.category}
                onChange={(event) =>
                  setProductForm((prev) => ({ ...prev, category: event.target.value }))
                }
                required
                className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              >
                <option value="">Select category</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2">
                <button
                  type="button"
                  onClick={() => {
                    const hasTag = productForm.tag.includes("new_arrival");
                    const newTags = hasTag
                      ? productForm.tag.replace(/new_arrival,?/g, "").replace(/,$/, "")
                      : (productForm.tag ? `${productForm.tag},new_arrival` : "new_arrival");
                    setProductForm((prev) => ({ ...prev, tag: newTags }));
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition ${
                    productForm.tag.includes("new_arrival")
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                  } border`}
                >
                  New Arrival
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const hasTag = productForm.tag.includes("bestseller");
                    const newTags = hasTag
                      ? productForm.tag.replace(/bestseller,?/g, "").replace(/,$/, "")
                      : (productForm.tag ? `${productForm.tag},bestseller` : "bestseller");
                    setProductForm((prev) => ({ ...prev, tag: newTags }));
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition ${
                    productForm.tag.includes("bestseller")
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                  } border`}
                >
                  Best Seller
                </button>
              </div>
            </div>
            <textarea
              value={productForm.imagesText}
              onChange={(event) =>
                setProductForm((prev) => ({ ...prev, imagesText: event.target.value }))
              }
              placeholder="Image URLs, one per line"
              required
              rows={4}
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
            />
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              >
                {editingProductId ? "Update Product" : "Add Product"}
              </button>
              {editingProductId && (
                <button
                  type="button"
                  onClick={resetProductForm}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="text-lg font-semibold text-slate-900">
              Saved Products ({products.length})
            </h2>
            <div className="flex gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-slate-500"
              >
                <option value="All">All Categories</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <select
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-slate-500"
              >
                <option value="All">All Tags</option>
                <option value="new_arrival">New Arrival</option>
                <option value="bestseller">Best Seller</option>
              </select>
            </div>
          </div>
          {products.length === 0 ? (
            <p className="mt-2 text-sm text-slate-600">No products yet.</p>
          ) : (
            <div className="mt-4 max-h-[400px] space-y-3 overflow-y-auto pr-2">
              {products
                .filter((p) => filterCategory === "All" || p.category === filterCategory)
                .filter((p) => filterTag === "All" || (p.tag && p.tag.includes(filterTag)))
                .map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col gap-3 rounded-xl border border-slate-200 p-3 sm:flex-row sm:items-center"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-slate-900">{product.name}</p>
                      <p className="text-sm text-slate-600">
                        {product.category} · {product.price}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditProduct(product)}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDeleteProduct(product.id, product.name)}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

