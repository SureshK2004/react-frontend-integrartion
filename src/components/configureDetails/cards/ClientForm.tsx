// components/clients/ClientForm.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Camera,
    Upload,
    X,
    MapPin,
    User,
    Phone,
    Building,
    Users,
    Globe,
    Save,
    ArrowLeft,
    Loader2,
    Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";
import clientAPI from "@/service/client";


// Mock API service
const clientService = {
    async getClientById(id: string) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: id,
                    client_name: "Mr Mark Joe",
                    contact_name: "Mark Joe",
                    contact_number: "9884322567",
                    client_description: "Sample client description",
                    address: "777A, East Tambaram, Selaiyur, Chennai, Tamil Nadu 600059, India",
                    city: "Chennai",
                    pincode: "600059",
                    latitude: "12.9235978",
                    longitude: "80.1437936",
                    radius: "20",
                    visible_to: true,
                    can_exec_change_location: "Yes",
                    category: "End Customer",
                    team_id: "team-1",
                    user_id: "user-1",
                    client_profile_img: null
                });
            }, 500);
        });
    },

    async createClient(data: any) {
        console.log("Creating client:", data);
        toast.success("Client created successfully!");
        return { success: true };
    },

    async updateClient(id: string, data: any) {
        console.log(`Updating client ${id}:`, data);
        toast.success("Client updated successfully!");
        return { success: true };
    }
};

// Mock data
const mockEmployees = [
    { id: "user-1", name: "John Doe" },
    { id: "user-2", name: "Jane Smith" },
    { id: "user-3", name: "Robert Johnson" },
];

const mockTeams = [
    { id: "team-1", name: "Sales Team" },
    { id: "team-2", name: "Support Team" },
    { id: "team-3", name: "Marketing Team" },
];

// Type definitions
interface FormData {
    client_name: string;
    client_description: string;
    contact_name: string;
    contact_number: string;
    country_code: string;
    address: string;
    city: string;
    pincode: string;
    latitude: string;
    longitude: string;
    radius: string;
    visible_to: boolean;
    employee_chnage_location: string;
    category: string;
    employee: string;
    teams: string;
}

const ClientForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Google Maps refs and state
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
    const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    // Form state
    const [formData, setFormData] = useState<FormData>({
        client_name: "",
        client_description: "",
        contact_name: "",
        contact_number: "",
        country_code: "+91",
        address: "",
        city: "",
        pincode: "",
        latitude: "12.8912559",
        longitude: "80.0810008999999",
        radius: "20",
        visible_to: true,
        employee_chnage_location: "Yes",
        category: "",
        employee: "",
        teams: "",
    });

    // Google Maps state
    const [mapCenter, setMapCenter] = useState({
        lat: 12.8912559,
        lng: 80.0810008999999
    });
    const [markerPosition, setMarkerPosition] = useState({
        lat: 12.8912559,
        lng: 80.0810008999999
    });

    // Initialize form for edit mode
    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            fetchClientData();
        }
    }, [id]);

    const fetchClientData = async () => {
        setLoading(true);

        try {
            const res = await clientAPI.getById(Number(id));
            const data = res.data.data;

            setFormData({
                client_name: data.client_name,
                client_description: data.description || "",
                contact_name: data.contact_name,
                contact_number: data.contact_number,
                country_code: "+91",
                address: data.address,
                city: data.city,
                pincode: data.pincode,
                latitude: data.latitude,
                longitude: data.longitude,
                radius: String(data.radius || "20"),
                visible_to: data.visible_to,
                employee_chnage_location: data.can_exec_change_location ? "Yes" : "No",
                category: data.category,
                employee: data.user_id || "",
                teams: "",
            });

            if (data.client_profile_img) {
                setImagePreview(data.client_profile_img);
            }
        } catch (error) {
            toast.error("Failed to load client details");
        }

        setLoading(false);
    };


    // Handle image upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Update map position if latitude/longitude changes
        if (name === "latitude" || name === "longitude") {
            const lat = parseFloat(name === "latitude" ? value : formData.latitude);
            const lng = parseFloat(name === "longitude" ? value : formData.longitude);

            if (!isNaN(lat) && !isNaN(lng)) {
                setMapCenter({ lat, lng });
                setMarkerPosition({ lat, lng });
            }
        }
    };

    const handleSelectChange = (name: keyof FormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            visible_to: checked
        }));
    };

    // ========== GOOGLE MAPS FUNCTIONS ==========

    // Update location fields when marker is dragged
    const updateLocationFields = (position: google.maps.LatLng) => {
        const lat = position.lat();
        const lng = position.lng();

        // Update latitude and longitude fields
        setFormData(prev => ({
            ...prev,
            latitude: lat.toString(),
            longitude: lng.toString()
        }));

        // Update marker position
        const newPosition = { lat, lng };
        setMarkerPosition(newPosition);
        setMapCenter(newPosition);

        // Use geocoder to fetch address details
        if (geocoder) {
            geocoder.geocode({ location: newPosition }, (results, status) => {
                if (status === "OK" && results?.[0]) {
                    const addressComponents = results[0].address_components;

                    // Update address field
                    setFormData(prev => ({
                        ...prev,
                        address: results[0].formatted_address || prev.address
                    }));

                    // Extract city and pincode from address components
                    let city = "";
                    let pincode = "";

                    addressComponents?.forEach((component) => {
                        if (component.types.includes("locality")) {
                            city = component.long_name;
                        }
                        if (component.types.includes("postal_code")) {
                            pincode = component.long_name;
                        }
                    });

                    // Update city and pincode fields
                    if (city) {
                        setFormData(prev => ({
                            ...prev,
                            city: city
                        }));
                    }
                    if (pincode) {
                        setFormData(prev => ({
                            ...prev,
                            pincode: pincode
                        }));
                    }

                    toast.success("Location updated!");
                }
            });
        }
    };

    // Handle map load
    const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
        setMap(mapInstance);

        // Initialize geocoder
        const geocoderInstance = new window.google.maps.Geocoder();
        setGeocoder(geocoderInstance);

        // Initialize SearchBox
        const searchInput = document.getElementById("search-box") as HTMLInputElement;
        if (searchInput) {
            const searchBoxInstance = new window.google.maps.places.SearchBox(searchInput);
            setSearchBox(searchBoxInstance);

            // Bias the SearchBox results towards the map's viewport
            mapInstance.addListener("bounds_changed", () => {
                searchBoxInstance.setBounds(mapInstance.getBounds()!);
            });

            // Handle search box input
            searchBoxInstance.addListener("places_changed", () => {
                const places = searchBoxInstance.getPlaces();
                if (places.length === 0) return;

                const place = places[0];
                const location = place.geometry?.location;

                if (location) {
                    // Update map and marker position
                    mapInstance.setCenter(location);
                    mapInstance.setZoom(15);

                    const newPosition = {
                        lat: location.lat(),
                        lng: location.lng()
                    };

                    setMarkerPosition(newPosition);
                    setMapCenter(newPosition);

                    // Update form fields
                    setFormData(prev => ({
                        ...prev,
                        address: place.formatted_address || prev.address,
                        latitude: newPosition.lat.toString(),
                        longitude: newPosition.lng.toString()
                    }));

                    // Extract city and pincode from address components
                    let city = "";
                    let pincode = "";

                    place.address_components?.forEach((component) => {
                        if (component.types.includes("locality")) {
                            city = component.long_name;
                        }
                        if (component.types.includes("postal_code")) {
                            pincode = component.long_name;
                        }
                    });

                    if (city) {
                        setFormData(prev => ({
                            ...prev,
                            city: city
                        }));
                    }
                    if (pincode) {
                        setFormData(prev => ({
                            ...prev,
                            pincode: pincode
                        }));
                    }

                    toast.success("Location updated!");
                }
            });
        }
    }, []);

    // Search address manually (button click)
    const handleSearchAddress = useCallback(() => {
        const searchQuery = searchInputRef.current?.value;
        if (!searchQuery || !searchQuery.trim() || !geocoder) {
            toast.error("Please enter an address to search");
            return;
        }

        geocoder.geocode({ address: searchQuery }, (results, status) => {
            if (status === "OK" && results?.[0]) {
                const location = results[0].geometry.location;

                if (map) {
                    map.setCenter(location);
                    map.setZoom(15);
                }

                const newPosition = {
                    lat: location.lat(),
                    lng: location.lng()
                };

                setMarkerPosition(newPosition);
                setMapCenter(newPosition);

                const addressComponents = results[0].address_components;
                let city = "";
                let pincode = "";

                addressComponents?.forEach((component) => {
                    if (component.types.includes("locality")) {
                        city = component.long_name;
                    }
                    if (component.types.includes("postal_code")) {
                        pincode = component.long_name;
                    }
                });

                setFormData(prev => ({
                    ...prev,
                    address: results[0].formatted_address,
                    latitude: newPosition.lat.toString(),
                    longitude: newPosition.lng.toString(),
                    city: city || prev.city,
                    pincode: pincode || prev.pincode
                }));

                toast.success("Location found!");
            } else {
                toast.error("Address not found. Please try a different search.");
            }
        });
    }, [geocoder, map]);

    // Handle Enter key in search
    const handleSearchKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // If searchBox is initialized, let it handle the search
            if (searchBox) {
                // Trigger the places_changed event
                const searchInput = document.getElementById("search-box") as HTMLInputElement;
                if (searchInput) {
                    // Simulate a change event to trigger SearchBox
                    searchInput.focus();
                }
            } else {
                handleSearchAddress();
            }
        }
    };

    // Handle marker drag end
    const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            updateLocationFields(e.latLng);
        }
    };

    // Form validation
    const validateForm = () => {
        const requiredFields = [
            'client_name',
            'contact_name',
            'contact_number',
            'address',
            'latitude',
            'longitude',
            'radius'
        ];

        for (const field of requiredFields) {
            if (!formData[field as keyof FormData]) {
                toast.error(`${field.replace('_', ' ')} is required`);
                return false;
            }
        }

        if (formData.contact_number && !/^[6-9]\d{9}$/.test(formData.contact_number)) {
            toast.error("Please enter a valid 10-digit contact number starting with 6-9");
            return false;
        }

        if (!formData.visible_to && !formData.employee && !formData.teams) {
            toast.error("Please select 'Visible To Everyone', an Employee, or a Team");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            const payload = {
                org_id: 3,
                user_id: 114, // You should get this from authentication context
                client_id: id ? Number(id) : undefined,
                client_name: formData.client_name,
                contact_name: formData.contact_name,
                contact_number: formData.contact_number,
                email: "", // Add if needed
                Visible_to: formData.visible_to,
                employee_chnage_location: formData.employee_chnage_location,
                city: formData.city,
                address: formData.address,
                pincode: formData.pincode,
                latitude: formData.latitude,
                longitude: formData.longitude,
                radius: Number(formData.radius),
                category: formData.category,
                client_description: formData.client_description,
                clientProfileImage: imagePreview,
            };

            if (id) {
                await clientAPI.update(payload);
                toast.success("Client updated successfully");
            } else {
                await clientAPI.create(payload);
                toast.success("Client created successfully");
            }

           
            navigate("/config/client_site");

        } catch (error: any) {
            console.error("Error saving client:", error);
            toast.error(error.response?.data?.message || "Failed to save client");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
           
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/congif/client_site/client")}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft size={16} />
                            Back
                        </Button>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {isEditMode ? "Edit Client" : "Add Client"}
                        </h1>
                    </div>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2"
                    >
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Save size={16} />
                        )}
                        {isEditMode ? "Update Client" : "Save Client"}
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                        <div className="lg:col-span-1 space-y-6">
                          
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <div className="relative mx-auto w-32 h-32">
                                            <div
                                                className="w-full h-full rounded-full border-2 border-dashed border-blue-400 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center cursor-pointer"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                {imagePreview ? (
                                                    <>
                                                        <img
                                                            src={imagePreview}
                                                            alt="Client"
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeImage();
                                                            }}
                                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <div className="text-center">
                                                        <Upload className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                                                        <p className="text-sm text-gray-500">Click to upload</p>
                                                        <p className="text-xs text-gray-400">SVG, PNG, JPG, JPEG</p>
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>


                            <Card>
                                <CardContent className="space-y-4 pt-6">
                                    <div>
                                        <Label htmlFor="client_name" className="flex items-center gap-1">
                                            Client Name <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="client_name"
                                            name="client_name"
                                            value={formData.client_name}
                                            onChange={handleInputChange}
                                            placeholder="Enter client name"
                                            required
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="client_description">Client Description</Label>
                                        <Textarea
                                            id="client_description"
                                            name="client_description"
                                            value={formData.client_description}
                                            onChange={handleInputChange}
                                            placeholder="Enter client description"
                                            className="mt-1"
                                            maxLength={45}
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formData.client_description.length}/45
                                        </p>
                                    </div>

                                    <div>
                                        <Label htmlFor="contact_name" className="flex items-center gap-1">
                                            Contact Name <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="contact_name"
                                            name="contact_name"
                                            value={formData.contact_name}
                                            onChange={handleInputChange}
                                            placeholder="Enter contact name"
                                            required
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="contact_number" className="flex items-center gap-1">
                                            Contact Number <span className="text-red-500">*</span>
                                        </Label>
                                        <div className="flex gap-2 mt-1">
                                            <Select
                                                value={formData.country_code}
                                                onValueChange={(value) => handleSelectChange("country_code", value)}
                                            >
                                                <SelectTrigger className="w-32">
                                                    <SelectValue placeholder="Code" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="+91">+91</SelectItem>
                                                    <SelectItem value="+1">+1</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Input
                                                id="contact_number"
                                                name="contact_number"
                                                value={formData.contact_number}
                                                onChange={handleInputChange}
                                                placeholder="Enter 10-digit number"
                                                pattern="[6-9]{1}[0-9]{9}"
                                                maxLength={10}
                                                required
                                                className="flex-1"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Must start with 6-9 and be 10 digits
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Settings */}
                            <Card>
                                <CardContent className="space-y-4 pt-6">
                                    <div>
                                        <Label htmlFor="employee_chnage_location">Can employee change location</Label>
                                        <Select
                                            value={formData.employee_chnage_location}
                                            onValueChange={(value) => handleSelectChange("employee_chnage_location", value)}
                                        >
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Yes">Yes</SelectItem>
                                                <SelectItem value="No">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="category">Category</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) => handleSelectChange("category", value)}
                                        >
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="End Customer">End Customer</SelectItem>
                                                <SelectItem value="Distributor">Distributor</SelectItem>
                                                <SelectItem value="Dealer">Dealer</SelectItem>
                                                <SelectItem value="Supplier">Supplier</SelectItem>
                                                <SelectItem value="Retailer">Retailer</SelectItem>
                                                <SelectItem value="Others">Others</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="city">Enter City Name</Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="Enter city name"
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="pincode">Pincode</Label>
                                        <Input
                                            id="pincode"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            placeholder="Enter pincode"
                                            className="mt-1"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Middle Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Address and Map */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Address</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="address" className="flex items-center gap-1">
                                                Address <span className="text-red-500">*</span>
                                            </Label>
                                            <Textarea
                                                id="address"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                placeholder="Enter address"
                                                required
                                                className="mt-1 min-h-[80px]"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="radius" className="flex items-center gap-1">
                                                Radius (m) <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="radius"
                                                name="radius"
                                                value={formData.radius}
                                                onChange={handleInputChange}
                                                placeholder="Enter radius"
                                                required
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="latitude" className="flex items-center gap-1">
                                                Latitude <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="latitude"
                                                name="latitude"
                                                value={formData.latitude}
                                                onChange={handleInputChange}
                                                placeholder="Enter latitude"
                                                required
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="longitude" className="flex items-center gap-1">
                                                Longitude <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="longitude"
                                                name="longitude"
                                                value={formData.longitude}
                                                onChange={handleInputChange}
                                                placeholder="Enter longitude"
                                                required
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Search and Map */}
                            <Card>
                                <CardContent className="space-y-4 pt-6">
                                    <div>
                                        <Label htmlFor="search-box">Search Address</Label>
                                        <div className="flex gap-2 mt-1">
                                            <input
                                                ref={searchInputRef}
                                                id="search-box"
                                                placeholder="Search for an address..."
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                onKeyDown={handleSearchKeyPress}
                                                defaultValue="Vandalur"
                                            />
                                            <Button
                                                type="button"
                                                onClick={handleSearchAddress}
                                                variant="outline"
                                            >
                                                <Search size={16} className="mr-2" />
                                                Search
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Google Map */}
                                    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                                        style={{ height: '300px' }}>
                                        <LoadScript
                                            googleMapsApiKey="AIzaSyAMhDrhZT4dtqwh9kte3Nxd1KfdjQqb48I"
                                            libraries={["places"]}
                                            onLoad={() => {
                                                console.log("Google Maps script loaded");
                                                setIsScriptLoaded(true);
                                            }}
                                            onError={() => {
                                                console.error("Google Maps script failed to load");
                                                toast.error("Failed to load Google Maps. Please check your API key.");
                                            }}
                                        >
                                            {isScriptLoaded && (
                                                <GoogleMap
                                                    mapContainerStyle={{ width: '100%', height: '100%' }}
                                                    center={mapCenter}
                                                    zoom={15}
                                                    onLoad={handleMapLoad}
                                                    onClick={(e) => {
                                                        // Optional: Click to add/update marker
                                                        if (e.latLng) {
                                                            updateLocationFields(e.latLng);
                                                        }
                                                    }}
                                                    options={{
                                                        zoomControl: true,
                                                        mapTypeControl: true,
                                                        scaleControl: true,
                                                        streetViewControl: true,
                                                        rotateControl: true,
                                                        fullscreenControl: true
                                                    }}
                                                >
                                                    {/* Default Marker - This is what was missing! */}
                                                    <Marker
                                                        position={markerPosition}
                                                        draggable={true}
                                                        onDragEnd={handleMarkerDragEnd}
                                                        icon={{
                                                            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                                                            scaledSize: new window.google.maps.Size(40, 40),
                                                            origin: new window.google.maps.Point(0, 0),
                                                            anchor: new window.google.maps.Point(20, 40)
                                                        }}
                                                    />

                                                    {/* Radius circle */}
                                                    {formData.radius && parseFloat(formData.radius) > 0 && (
                                                        <Circle
                                                            center={markerPosition}
                                                            radius={parseFloat(formData.radius)}
                                                            options={{
                                                                fillColor: "#3b82f6",
                                                                fillOpacity: 0.2,
                                                                strokeColor: "#3b82f6",
                                                                strokeOpacity: 0.8,
                                                                strokeWeight: 2,
                                                                clickable: false,
                                                                draggable: false,
                                                                editable: false,
                                                                zIndex: 1
                                                            }}
                                                        />
                                                    )}
                                                </GoogleMap>
                                            )}
                                        </LoadScript>
                                    </div>
                                    <div className="text-xs text-gray-500 text-center">
                                        Drag the marker to adjust location, or search for an address above
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Visibility Settings */}
                            <Card>
                                <CardContent className="space-y-4 pt-6">
                                    <div className="flex items-center justify-between">
                                        <Label className="flex items-center gap-1">
                                            Visible To <span className="text-red-500">*</span>
                                        </Label>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="visible_to"
                                                checked={formData.visible_to}
                                                onCheckedChange={(checked) => handleCheckboxChange(checked as boolean)}
                                            />
                                            <Label htmlFor="visible_to" className="cursor-pointer">
                                                Everyone
                                            </Label>
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="employee">Employee</Label>
                                        <Select
                                            value={formData.employee}
                                            onValueChange={(value) => handleSelectChange("employee", value)}
                                            disabled={formData.visible_to}
                                        >
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select Employee" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {mockEmployees.map((emp) => (
                                                    <SelectItem key={emp.id} value={emp.id}>
                                                        {emp.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="teams">Teams</Label>
                                        <Select
                                            value={formData.teams}
                                            onValueChange={(value) => handleSelectChange("teams", value)}
                                            disabled={formData.visible_to}
                                        >
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select Team" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {mockTeams.map((team) => (
                                                    <SelectItem key={team.id} value={team.id}>
                                                        {team.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClientForm;