import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Code, CheckCircle, Upload, Share, Users, Loader2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[\+]?[0-9]{10,15}$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  college: z.string().min(1, "Please select your college/department"),
  screenshot: z.instanceof(FileList).refine((files) => files.length > 0, "Please upload a screenshot"),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

const collegeOptions = [
  "Computer Science",
  "Information Technology", 
  "Software Engineering",
  "Data Science",
  "Cybersecurity",
  "Web Development",
  "Mobile Development",
  "Other"
];

export default function Home() {
  const [shareCount, setShareCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      college: "",
    },
  });

  // Check if user has already submitted
  useEffect(() => {
    const submitted = localStorage.getItem('techForGirlsSubmitted');
    if (submitted === 'true') {
      setIsSubmitted(true);
    }
  }, []);

  // Calculate progress
  const getProgress = () => {
    const formValues = form.getValues();
    const hasBasicInfo = formValues.name && formValues.phone && formValues.email && formValues.college;
    const hasFile = selectedFile !== null;
    const hasSharedEnough = shareCount >= 5;

    if (!hasBasicInfo) return 33;
    if (!hasFile) return 66;
    if (!hasSharedEnough) return 85;
    return 100;
  };

  const getProgressText = () => {
    const progress = getProgress();
    if (progress <= 33) return "Step 1 of 3";
    if (progress <= 66) return "Step 2 of 3";  
    if (progress < 100) return "Step 3 of 3";
    return "Ready to Submit!";
  };

  const handleWhatsAppShare = () => {
    if (shareCount >= 5) {
      toast({
        title: "Sharing Complete",
        description: "You have already completed sharing!",
        variant: "default",
      });
      return;
    }

    const message = encodeURIComponent('Hey Buddy, Join Tech For Girls Community');
    const whatsappUrl = `https://wa.me/?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    
    const newCount = shareCount + 1;
    setShareCount(newCount);
    
    if (newCount >= 5) {
      toast({
        title: "Sharing Complete! 🎉",
        description: "You can now submit your registration.",
        variant: "default",
      });
    } else {
      toast({
        title: "Shared Successfully",
        description: `${newCount}/5 shares completed. Keep sharing!`,
        variant: "default",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue('screenshot', event.target.files as FileList);
      toast({
        title: "File Uploaded",
        description: `Selected: ${file.name}`,
        variant: "default",
      });
    }
  };

  const onSubmit = async (data: RegistrationForm) => {
    if (shareCount < 5) {
      toast({
        title: "Sharing Required",
        description: "Please share with 5 friends before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (isSubmitted) {
      toast({
        title: "Already Submitted",
        description: "You have already submitted your registration.",
        variant: "default",
      });
      return;
    }

    setIsLoading(true);

    try {
      const submissionData = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        college: data.college,
        screenshotFileName: selectedFile?.name || "No file",
        shareCount: shareCount,
      };

      await apiRequest('POST', '/api/register', submissionData);
      
      localStorage.setItem('techForGirlsSubmitted', 'true');
      setIsSubmitted(true);
      
      toast({
        title: "Registration Successful! 🎉",
        description: "Your submission has been recorded. Thanks for being part of Tech for Girls!",
        variant: "default",
      });
      
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
            <CardContent className="pt-8 pb-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <CheckCircle className="text-white text-3xl" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">🎉 Registration Successful!</h1>
                <p className="text-gray-600 mb-6">Your submission has been recorded. Thanks for being part of Tech for Girls!</p>
                <div className="text-center text-gray-500 text-sm">
                  <p>© 2024 Tech For Girls Community. All rights reserved.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-float">
            <Code className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Tech For Girls</h1>
          <p className="text-gray-600">Join our amazing community of tech enthusiasts!</p>
        </div>

        {/* Registration Form Card */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="pt-8 pb-8">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Registration Progress</span>
                <span className="text-sm font-medium text-purple-600">{getProgressText()}</span>
              </div>
              <Progress value={getProgress()} className="h-2" />
            </div>

            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div className="floating-label">
                <Input
                  id="name"
                  type="text"
                  placeholder=" "
                  {...form.register("name")}
                  className="peer h-12 pt-4 border-2 focus:border-purple-500 transition-all duration-200"
                />
                <Label htmlFor="name">Full Name</Label>
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="floating-label">
                <Input
                  id="phone"
                  type="tel"
                  placeholder=" "
                  {...form.register("phone")}
                  className="peer h-12 pt-4 border-2 focus:border-purple-500 transition-all duration-200"
                />
                <Label htmlFor="phone">Phone Number</Label>
                {form.formState.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="floating-label">
                <Input
                  id="email"
                  type="email"
                  placeholder=" "
                  {...form.register("email")}
                  className="peer h-12 pt-4 border-2 focus:border-purple-500 transition-all duration-200"
                />
                <Label htmlFor="email">Email Address</Label>
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>

              {/* College/Department Field */}
              <div>
                <Select onValueChange={(value) => form.setValue("college", value)}>
                  <SelectTrigger className="h-12 border-2 focus:border-purple-500 transition-all duration-200">
                    <SelectValue placeholder="Select College/Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {collegeOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.college && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.college.message}</p>
                )}
              </div>

              {/* WhatsApp Share Section */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <SiWhatsapp className="text-green-500 mr-2" />
                  Share with Friends
                </h3>
                <p className="text-sm text-gray-600 mb-4">Share our community with 5 friends to complete your registration!</p>
                
                <div className="flex items-center justify-between mb-4">
                  <Button
                    type="button"
                    onClick={handleWhatsAppShare}
                    disabled={shareCount >= 5}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 mr-4 disabled:opacity-50"
                  >
                    <Share className="mr-2 h-4 w-4" />
                    Share on WhatsApp
                  </Button>
                  <div className="bg-white rounded-lg px-4 py-3 border-2 border-green-200">
                    <span className="text-sm font-medium text-gray-600">Count: </span>
                    <span className="text-lg font-bold text-green-600">{shareCount}/5</span>
                  </div>
                </div>

                {shareCount >= 5 && (
                  <div className="bg-green-100 border-2 border-green-300 rounded-lg p-3 flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                    <span className="text-green-700 font-medium">Sharing complete. Please continue.</span>
                  </div>
                )}
              </div>

              {/* File Upload Section */}
              <div className="bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-300 hover:border-purple-400 transition-all duration-200">
                <div className="text-center">
                  <Upload className="mx-auto h-10 w-10 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Screenshot</h3>
                  <p className="text-sm text-gray-600 mb-4">Upload a screenshot (resume, photo, etc.)</p>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="screenshot"
                  />
                  <Button
                    type="button"
                    onClick={() => document.getElementById('screenshot')?.click()}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
                  >
                    Choose File
                  </Button>
                  {selectedFile && (
                    <p className="text-sm text-gray-600 mt-2">Selected: {selectedFile.name}</p>
                  )}
                </div>
                {form.formState.errors.screenshot && (
                  <p className="text-red-500 text-sm mt-2 text-center">{form.formState.errors.screenshot.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={shareCount < 5 || isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-pink-600 transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Users className="mr-2 h-4 w-4" />
                    Complete Registration
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">© 2024 Tech For Girls Community. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
