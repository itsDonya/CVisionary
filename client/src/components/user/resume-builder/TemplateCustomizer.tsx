import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Grid,
} from "@mui/material";
import { Palette, Type, Layout, X } from "lucide-react";
import { ChromePicker } from "react-color";
import { useTemplateStore } from "@/stores/templateStore";

interface TemplateCustomizerProps {
  open: boolean;
  onClose: () => void;
  templateId: string;
}

const TemplateCustomizer: React.FC<TemplateCustomizerProps> = ({
  open,
  onClose,
  templateId,
}) => {
  const { customizations, updateCustomization, resetCustomization } =
    useTemplateStore();
  const [activeTab, setActiveTab] = useState(0);
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);

  const currentCustomization = customizations[templateId] || {
    colors: {
      primary: "#3b82f6",
      secondary: "#6b7280",
      text: "#1f2937",
      background: "#ffffff",
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
    },
    spacing: {
      sections: 24,
      paragraphs: 12,
    },
    layout: {
      columns: 1,
      headerAlignment: "left",
      sectionSpacing: "normal",
    },
  };

  const handleColorChange = (colorKey: string, color: any) => {
    updateCustomization(templateId, {
      colors: {
        ...currentCustomization.colors,
        [colorKey]: color.hex,
      },
    });
  };

  const handleFontChange = (fontType: "heading" | "body", value: string) => {
    updateCustomization(templateId, {
      fonts: {
        ...currentCustomization.fonts,
        [fontType]: value,
      },
    });
  };

  const handleSpacingChange = (
    spacingType: "sections" | "paragraphs",
    value: number
  ) => {
    updateCustomization(templateId, {
      spacing: {
        ...currentCustomization.spacing,
        [spacingType]: value,
      },
    });
  };

  const handleLayoutChange = (layoutKey: string, value: any) => {
    updateCustomization(templateId, {
      layout: {
        ...currentCustomization.layout,
        [layoutKey]: value,
      },
    });
  };

  const handleReset = () => {
    resetCustomization(templateId);
  };

  const fontOptions = [
    "Inter",
    "Arial",
    "Times New Roman",
    "Georgia",
    "Helvetica",
    "Roboto",
    "Open Sans",
    "Lato",
    "Montserrat",
    "Poppins",
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#1e293b",
          backgroundImage: "none",
          border: "1px solid rgba(51, 65, 85, 0.3)",
          minHeight: "600px",
        },
      }}>
      <DialogTitle
        sx={{
          color: "white",
          borderBottom: "1px solid rgba(51, 65, 85, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <span>Customize Template</span>
        <Button
          onClick={onClose}
          sx={{ color: "white", minWidth: "auto", p: 1 }}>
          <X className="w-4 h-4" />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: "1px solid rgba(51, 65, 85, 0.3)" }}>
          <Tab
            icon={<Palette className="w-4 h-4" />}
            label="Colors"
            sx={{ color: "white", "&.Mui-selected": { color: "#8b5cf6" } }}
          />
          <Tab
            icon={<Type className="w-4 h-4" />}
            label="Typography"
            sx={{ color: "white", "&.Mui-selected": { color: "#8b5cf6" } }}
          />
          <Tab
            icon={<Layout className="w-4 h-4" />}
            label="Layout"
            sx={{ color: "white", "&.Mui-selected": { color: "#8b5cf6" } }}
          />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {/* Colors Tab */}
          {activeTab === 0 && (
            <div className="space-y-6">
              <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
                Color Scheme
              </Typography>

              <Grid container spacing={3}>
                {Object.entries(currentCustomization.colors).map(
                  ([key, value]) => (
                    <Grid item xs={6} key={key}>
                      <div className="space-y-2">
                        <Typography
                          variant="body2"
                          sx={{ color: "white", textTransform: "capitalize" }}>
                          {key} Color
                        </Typography>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-8 rounded border cursor-pointer"
                            style={{ backgroundColor: value }}
                            onClick={() =>
                              setShowColorPicker(
                                showColorPicker === key ? null : key
                              )
                            }
                          />
                          <TextField
                            value={value}
                            size="small"
                            sx={{
                              flex: 1,
                              "& .MuiInputBase-input": { color: "white" },
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: "rgba(255,255,255,0.3)",
                                },
                                "&:hover fieldset": {
                                  borderColor: "rgba(255,255,255,0.5)",
                                },
                              },
                            }}
                          />
                        </div>

                        {showColorPicker === key && (
                          <div className="absolute z-10">
                            <div
                              className="fixed inset-0"
                              onClick={() => setShowColorPicker(null)}
                            />
                            <ChromePicker
                              color={value}
                              onChange={(color) =>
                                handleColorChange(key, color)
                              }
                            />
                          </div>
                        )}
                      </div>
                    </Grid>
                  )
                )}
              </Grid>
            </div>
          )}

          {/* Typography Tab */}
          {activeTab === 1 && (
            <div className="space-y-6">
              <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
                Typography Settings
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: "white" }}>
                      Heading Font
                    </InputLabel>
                    <Select
                      value={currentCustomization.fonts.heading}
                      onChange={(e) =>
                        handleFontChange("heading", e.target.value)
                      }
                      sx={{
                        color: "white",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(255,255,255,0.3)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(255,255,255,0.5)",
                        },
                      }}>
                      {fontOptions.map((font) => (
                        <MenuItem key={font} value={font}>
                          {font}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: "white" }}>Body Font</InputLabel>
                    <Select
                      value={currentCustomization.fonts.body}
                      onChange={(e) => handleFontChange("body", e.target.value)}
                      sx={{
                        color: "white",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(255,255,255,0.3)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(255,255,255,0.5)",
                        },
                      }}>
                      {fontOptions.map((font) => (
                        <MenuItem key={font} value={font}>
                          {font}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <Typography sx={{ color: "white", mb: 2 }}>
                    Section Spacing: {currentCustomization.spacing.sections}px
                  </Typography>
                  <Slider
                    value={currentCustomization.spacing.sections}
                    onChange={(_, value) =>
                      handleSpacingChange("sections", value as number)
                    }
                    min={16}
                    max={48}
                    sx={{
                      color: "#8b5cf6",
                      "& .MuiSlider-thumb": {
                        backgroundColor: "#8b5cf6",
                      },
                      "& .MuiSlider-track": {
                        backgroundColor: "#8b5cf6",
                      },
                      "& .MuiSlider-rail": {
                        backgroundColor: "rgba(255,255,255,0.3)",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography sx={{ color: "white", mb: 2 }}>
                    Paragraph Spacing: {currentCustomization.spacing.paragraphs}
                    px
                  </Typography>
                  <Slider
                    value={currentCustomization.spacing.paragraphs}
                    onChange={(_, value) =>
                      handleSpacingChange("paragraphs", value as number)
                    }
                    min={8}
                    max={24}
                    sx={{
                      color: "#8b5cf6",
                      "& .MuiSlider-thumb": {
                        backgroundColor: "#8b5cf6",
                      },
                      "& .MuiSlider-track": {
                        backgroundColor: "#8b5cf6",
                      },
                      "& .MuiSlider-rail": {
                        backgroundColor: "rgba(255,255,255,0.3)",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          )}

          {/* Layout Tab */}
          {activeTab === 2 && (
            <div className="space-y-6">
              <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
                Layout Settings
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: "white" }}>
                      Header Alignment
                    </InputLabel>
                    <Select
                      value={currentCustomization.layout.headerAlignment}
                      onChange={(e) =>
                        handleLayoutChange("headerAlignment", e.target.value)
                      }
                      sx={{
                        color: "white",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(255,255,255,0.3)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(255,255,255,0.5)",
                        },
                      }}>
                      <MenuItem value="left">Left</MenuItem>
                      <MenuItem value="center">Center</MenuItem>
                      <MenuItem value="right">Right</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: "white" }}>
                      Section Spacing
                    </InputLabel>
                    <Select
                      value={currentCustomization.layout.sectionSpacing}
                      onChange={(e) =>
                        handleLayoutChange("sectionSpacing", e.target.value)
                      }
                      sx={{
                        color: "white",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(255,255,255,0.3)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(255,255,255,0.5)",
                        },
                      }}>
                      <MenuItem value="compact">Compact</MenuItem>
                      <MenuItem value="normal">Normal</MenuItem>
                      <MenuItem value="spacious">Spacious</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          )}
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            p: 3,
            borderTop: "1px solid rgba(51, 65, 85, 0.3)",
            display: "flex",
            justifyContent: "space-between",
          }}>
          <Button
            onClick={handleReset}
            variant="outlined"
            sx={{
              borderColor: "rgba(255,255,255,0.3)",
              color: "white",
              "&:hover": {
                borderColor: "rgba(255,255,255,0.5)",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}>
            Reset to Default
          </Button>

          <Button
            onClick={onClose}
            sx={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)",
              },
            }}>
            Apply Changes
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateCustomizer;
