// components/sites/SiteForm.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, Save, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";
import { toast } from "sonner";

const SiteForm = () => {

    const navigate = useNavigate();
    const searchInputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);

    // Default map coordinates
    const [mapCenter, setMapCenter] = useState({
        lat: 12.8912559,
        lng: 80.0810009
    });

    const [markerPosition, setMarkerPosition] = useState({
        lat: 12.8912559,
        lng: 80.0810009
    });

    const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    const [formData, setFormData] = useState({
        client_id: "",
        site_name: "",
        contact_name: "",
        contact_number: "",
        description: "",
        site_type: "",
        city: "",
        pincode: "",
        address: "",
        radius: "20",
        latitude: "12.8912559",
        longitude: "80.0810009"
    });

    const handleInput = (e: any) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =============== MAP HANDLING ===============

    const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
        setMap(mapInstance);

        const geocoderInstance = new window.google.maps.Geocoder();
        setGeocoder(geocoderInstance);

        const searchInput = document.getElementById("search-box") as HTMLInputElement;
        if (searchInput) {
            const searchBoxInstance = new window.google.maps.places.SearchBox(searchInput);
            setSearchBox(searchBoxInstance);

            mapInstance.addListener("bounds_changed", () => {
                searchBoxInstance.setBounds(mapInstance.getBounds()!);
            });

            searchBoxInstance.addListener("places_changed", () => {
                const places = searchBoxInstance.getPlaces();
                if (!places || places.length === 0) return;

                const place = places[0];
                const location = place.geometry?.location;

                if (location) {
                    const newPos = {
                        lat: location.lat(),
                        lng: location.lng(),
                    };

                    setMarkerPosition(newPos);
                    setMapCenter(newPos);

                    setFormData((prev) => ({
                        ...prev,
                        address: place.formatted_address || prev.address,
                        latitude: newPos.lat.toString(),
                        longitude: newPos.lng.toString(),
                    }));

                    toast.success("Location updated!");
                }
            });
        }
    }, []);

    const updateLocation = (latLng: google.maps.LatLng) => {
        const lat = latLng.lat();
        const lng = latLng.lng();

        const newPos = { lat, lng };

        setMarkerPosition(newPos);
        setMapCenter(newPos);

        setFormData((prev) => ({
            ...prev,
            latitude: lat.toString(),
            longitude: lng.toString(),
        }));

        if (geocoder) {
            geocoder.geocode({ location: newPos }, (results, status) => {
                if (status === "OK" && results?.[0]) {
                    setFormData((prev) => ({
                        ...prev,
                        address: results[0].formatted_address,
                    }));

                    let city = "";
                    let pincode = "";

                    results[0].address_components.forEach((comp) => {
                        if (comp.types.includes("locality")) city = comp.long_name;
                        if (comp.types.includes("postal_code")) pincode = comp.long_name;
                    });

                    setFormData((prev) => ({
                        ...prev,
                        city: city || prev.city,
                        pincode: pincode || prev.pincode,
                    }));
                }
            });
        }
    };

    const handleSearchAddress = () => {
        const query = searchInputRef.current?.value;
        if (!query || !geocoder) {
            toast.error("Enter an address");
            return;
        }

        geocoder.geocode({ address: query }, (results, status) => {
            if (status === "OK" && results?.[0]) {
                const location = results[0].geometry.location;

                const pos = {
                    lat: location.lat(),
                    lng: location.lng()
                };

                setMarkerPosition(pos);
                setMapCenter(pos);

                setFormData((prev) => ({
                    ...prev,
                    address: results[0].formatted_address,
                    latitude: pos.lat.toString(),
                    longitude: pos.lng.toString(),
                }));
            }
        });
    };

    // ===================== UI =====================

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">

            {/* Header */}
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <Button
                        variant="ghost"
                        className="flex items-center gap-2"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={16} />
                        Back
                    </Button>

                    <Button className="flex items-center gap-2" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Save size={16} />}
                        Save Site
                    </Button>
                </div>

                {/* Form */}
                <form className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Left Column */}
                        <div className="space-y-6">

                            <Card>
                                <CardContent className="space-y-4 pt-6">
                                    
                                    {/* Select Client */}
                                    <div>
                                        <Label>Select Client</Label>
                                        <Select onValueChange={(val) => setFormData(prev => ({ ...prev, client_id: val }))}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Client" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Client 1</SelectItem>
                                                <SelectItem value="2">Client 2</SelectItem>
                                                <SelectItem value="3">Client 3</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Site Name *</Label>
                                        <Input name="site_name" value={formData.site_name} onChange={handleInput} />
                                    </div>

                                    <div>
                                        <Label>Contact Person Name *</Label>
                                        <Input name="contact_name" value={formData.contact_name} onChange={handleInput} />
                                    </div>

                                    <div>
                                        <Label>Contact Number *</Label>
                                        <Input name="contact_number" maxLength={10} value={formData.contact_number} onChange={handleInput} />
                                    </div>

                                    <div>
                                        <Label>Description</Label>
                                        <Textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <Label>Site Type</Label>
                                        <Select onValueChange={(val) => setFormData(prev => ({ ...prev, site_type: val }))}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Office">Office</SelectItem>
                                                <SelectItem value="Shop">Shop</SelectItem>
                                                <SelectItem value="Warehouse">Warehouse</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Enter City Name</Label>
                                        <Input name="city" value={formData.city} onChange={handleInput} />
                                    </div>

                                    <div>
                                        <Label>Pincode</Label>
                                        <Input name="pincode" value={formData.pincode} onChange={handleInput} />
                                    </div>

                                </CardContent>
                            </Card>

                        </div>

                        {/* Right Column (Address + Map) */}
                        <div className="lg:col-span-2 space-y-6">

                            <Card>
                                <CardHeader>
                                    <CardTitle>Address</CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-4">

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label>Address *</Label>
                                            <Textarea name="address" value={formData.address} onChange={handleInput} />
                                        </div>

                                        <div>
                                            <Label>Radius *</Label>
                                            <Input name="radius" value={formData.radius} onChange={handleInput} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label>Latitude *</Label>
                                            <Input name="latitude" value={formData.latitude} onChange={handleInput} />
                                        </div>
                                        <div>
                                            <Label>Longitude *</Label>
                                            <Input name="longitude" value={formData.longitude} onChange={handleInput} />
                                        </div>
                                    </div>

                                </CardContent>
                            </Card>

                            {/* Search + Map */}
                            <Card>
                                <CardContent className="space-y-4 pt-6">

                                    <div>
                                        <Label>Search Address</Label>
                                        <div className="flex gap-2 mt-1">
                                            <input
                                                id="search-box"
                                                ref={searchInputRef}
                                                placeholder="Search for address..."
                                                className="flex-1 px-3 py-2 border rounded-md"
                                            />

                                            <Button type="button" onClick={handleSearchAddress} variant="outline">
                                                <Search size={16} className="mr-2" /> Search
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="rounded-lg overflow-hidden border" style={{ height: "300px" }}>
                                        <LoadScript
                                            googleMapsApiKey="AIzaSyAMhDrhZT4dtqwh9kte3Nxd1KfdjQqb48I"
                                            libraries={["places"]}
                                            onLoad={() => console.log("Map Loaded")}
                                        >
                                            <GoogleMap
                                                mapContainerStyle={{ width: "100%", height: "100%" }}
                                                center={mapCenter}
                                                zoom={15}
                                                onLoad={handleMapLoad}
                                                onClick={(e) => e.latLng && updateLocation(e.latLng)}
                                            >
                                                <Marker
                                                    position={markerPosition}
                                                    draggable
                                                    onDragEnd={(e) => e.latLng && updateLocation(e.latLng)}
                                                />

                                                <Circle
                                                    center={markerPosition}
                                                    radius={parseFloat(formData.radius || "0")}
                                                    options={{
                                                        fillColor: "#3b82f6",
                                                        fillOpacity: 0.2,
                                                        strokeColor: "#3b82f6",
                                                        strokeWeight: 2,
                                                    }}
                                                />
                                            </GoogleMap>
                                        </LoadScript>
                                    </div>

                                    <p className="text-center text-xs text-gray-500">
                                        Drag the marker or search an address to update location.
                                    </p>

                                </CardContent>
                            </Card>

                        </div>

                    </div>
                </form>

            </div>
        </div>
    );
};

export default SiteForm;
